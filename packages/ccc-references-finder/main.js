const Fs = require('fs');
const Path = require('path');
const ConfigManager = require('./config-manager');
const FileUtil = require('./utils/file-util');
const ObjectUtil = require('./utils/object-util');

module.exports = {

  /** 节点树缓存 */
  nodeTrees: Object.create(null),

  /** 是否自动展开结果 */
  expand: true,

  /** 结果精确到节点 */
  detail: true,

  load() {
    // 读取配置
    const config = ConfigManager.read(false);
    this.expand = config.expand;
    this.detail = config.detail;
  },

  unload() {

  },

  messages: {

    'open-find-panel'() {
      Editor.Panel.open('ccc-references-finder.find');
    },

    'open-setting-panel'() {
      Editor.Panel.open('ccc-references-finder.setting');
    },

    'find-current-selection'() {
      this.findCurrentSelection();
    },

    'find-via-uuid'(event, uuid) {
      this.findViaUuid(uuid);
      event.reply(null, null);
    },

    'asset-db:asset-changed'(event, info) {
      if (info.type === 'scene' || info.type === 'prefab') {
        const path = Editor.assetdb.uuidToFspath(info.uuid);
        this.updateNodeTree(path);
      }
    },

    'save-config'(event, config) {
      this.expand = config.expand;
      this.detail = config.detail;
      ConfigManager.save(config);
      event.reply(null, true);
    },

    'read-config'(event) {
      const config = ConfigManager.read(true);
      event.reply(null, config);
    }

  },

  /**
   * 查找当前选中资源引用
   */
  findCurrentSelection() {
    const curUuids = Editor.Selection.curSelection('asset');
    if (curUuids.length === 0) {
      Editor.log('[🔎]', '请先在资源管理器中选择需要查找引用的资源！');
      return;
    }
    // 根据 uuid 查找
    for (let i = 0; i < curUuids.length; i++) {
      this.findViaUuid(curUuids[i]);
    }
  },

  /**
   * 使用 uuid 进行查找
   * @param {string} uuid 
   */
  findViaUuid(uuid) {
    // 是否为有效 uuid
    if (!Editor.Utils.UuidUtils.isUuid(uuid)) {
      Editor.log('[🔎]', '该 uuid 无效', uuid);
      return;
    }
    // 获取资源信息
    const assetInfo = Editor.assetdb.assetInfoByUuid(uuid);
    if (assetInfo) {
      // 暂不查找文件夹
      if (assetInfo.type === 'folder') {
        Editor.log('[🔎]', '暂不支持查找文件夹', assetInfo.url);
        return;
      }
      // 处理文件路径 & 打印头部日志
      const urlItems = assetInfo.url.replace('db://', '').split('/');
      if (!urlItems[urlItems.length - 1].includes('.')) {
        urlItems.splice(urlItems.length - 1);
      }
      Editor.log('[🔎]', '查找资源引用', urlItems.join('/'));
      // 记录子资源 uuid
      const subUuids = assetInfo ? [] : null;
      // 资源类型检查
      if (assetInfo.type === 'texture') {
        // 纹理子资源
        const subAssetInfos = Editor.assetdb.subAssetInfosByUuid(uuid);
        if (subAssetInfos) {
          for (let i = 0; i < subAssetInfos.length; i++) {
            subUuids.push(subAssetInfos[i].uuid);
          }
          uuid = null;
        }
      } else if (assetInfo.type === 'typescript' || assetInfo.type === 'javascript') {
        // 脚本
        uuid = Editor.Utils.UuidUtils.compressUuid(uuid);
      }
      // 查找
      const results = uuid ? this.findReferences(uuid) : [];
      if (subUuids && subUuids.length > 0) {
        for (let i = 0; i < subUuids.length; i++) {
          const subResults = this.findReferences(subUuids[i]);
          if (subResults.length > 0) {
            results.push(...subResults);
          }
        }
      }
      this.printResult(results);
    } else {
      // 不存在的资源，直接查找 uuid
      Editor.log('[🔎]', '查找资源引用', uuid);
      this.printResult(this.findReferences(uuid));
    }
  },

  /**
   * 查找引用
   * @param {string} uuid 
   * @returns {object[]}
   */
  findReferences(uuid) {
    const results = [];
    const handler = (filePath, stats) => {
      const extname = Path.extname(filePath);
      if (extname === '.fire' || extname === '.prefab' || extname === '.scene') {
        // 场景和预制体资源
        // 将资源数据转为节点树
        const nodeTree = this.getNodeTree(filePath);

        /**
         * 读取节点数据并查找引用
         * @param {object} node 目标节点
         * @param {object[]} container 容器
         */
        const search = (node, container) => {
          // 检查节点上的组件是否有引用
          const components = node['components'];
          if (components && components.length > 0) {
            for (let i = 0; i < components.length; i++) {
              const info = this.getContainsInfo(components[i], uuid);
              if (info.contains) {
                let type = components[i]['__type__'];
                // 是否为脚本资源
                if (Editor.Utils.UuidUtils.isUuid(type)) {
                  const scriptUuid = Editor.Utils.UuidUtils.decompressUuid(type);
                  const assetInfo = Editor.assetdb.assetInfoByUuid(scriptUuid);
                  type = Path.basename(assetInfo.url);
                }
                // 处理属性名称
                if (info.property) {
                  // Label 组件需要特殊处理
                  if (type === 'cc.Label' && info.property === '_N$file') {
                    info.property = 'font';
                  } else {
                    // 去除属性名的前缀
                    if (info.property.indexOf('_N$') !== -1) {
                      info.property = info.property.replace('_N$', '');
                    } else if (info.property.indexOf('_') === 0) {
                      info.property = info.property.substring(1);
                    }
                  }
                }
                container.push({ node: node['path'], component: type, property: info.property });
              }
            }
          }

          // 检查预制体是否有引用
          const prefab = node['prefab'];
          if (prefab) {
            // 排除预制体自己
            if (uuid !== nodeTree['__uuid__']) {
              const contains = ObjectUtil.containsValue(prefab, uuid);
              if (contains) {
                container.push({ node: node['path'] });
              }
            }
          }

          // 遍历子节点
          const children = node['children'];
          if (children && children.length > 0) {
            for (let i = 0; i < children.length; i++) {
              search(children[i], container);
            }
          }
        }

        // 开始遍历节点
        const _results = [];
        const children = nodeTree['children'];
        for (let i = 0; i < children.length; i++) {
          search(children[i], _results);
        }

        // 保存当前文件引用结果
        if (_results.length > 0) {
          const fileUrl = Editor.assetdb.fspathToUrl(filePath);
          results.push({ type: typeMap[extname], fileUrl: fileUrl, refs: _results });
        }
      } else if (extname === '.anim') {
        // 动画资源
        const data = JSON.parse(Fs.readFileSync(filePath));
        const curveData = data['curveData'];
        const contains = ObjectUtil.containsValue(curveData, uuid);
        if (contains) {
          const fileUrl = Editor.assetdb.fspathToUrl(filePath);
          results.push({ type: typeMap[extname], fileUrl: fileUrl });
        }
      } else if (extname === '.mtl' || filePath.indexOf('.fnt.meta') !== -1) {
        // 材质和字体资源
        const data = JSON.parse(Fs.readFileSync(filePath));
        const contains = ObjectUtil.containsValue(data, uuid);
        if (contains && !(data['uuid'] && data['uuid'] === uuid)) {
          const fileUrl = Editor.assetdb.fspathToUrl(filePath);
          const type = extname === '.mtl' ? '.mtl' : '.fnt.meta';
          results.push({ type: typeMap[type], fileUrl: fileUrl });
        }
      }
    }

    // 遍历资源目录下的文件
    const rootPath = Path.join(Editor.Project.path, 'assets');
    FileUtil.map(rootPath, handler);
    return results;
  },

  /**
   * 打印结果至控制台
   * @param {object[]} results 
   */
  printResult(results) {
    if (results.length === 0) {
      Editor.log('[🔎]', '没有找到该资源的引用！');
      Editor.log(`${'----'.repeat(36)}`);
      return;
    }
    // 添加引用
    const nodeRefs = [];
    let nodeRefsCount = 0;
    const assetRefs = [];
    let assetRefsCount = 0;
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const url = result.fileUrl.replace('db://', '').replace('.meta', '');
      if (result.type === '场景' || result.type === '预制体') {
        nodeRefs.push(`　　　·　📺 [${result.type}] ${url}`);
        for (let j = 0; j < result.refs.length; j++) {
          nodeRefsCount++;
          if (this.detail) {
            const ref = result.refs[j];
            let string = `　　　　　　　💾 [节点] ${ref.node}`;
            if (ref.component) {
              string += ` 　→ 　💿 [组件] ${ref.component}`;
            }
            if (ref.property) {
              string += ` 　→ 　🎲 [属性] ${ref.property}`;
            }
            nodeRefs.push(string);
          }
        }
      } else {
        assetRefsCount++;
        assetRefs.push(`　　　·　📦 [${result.type}] ${url}`);
      }
    }
    // 合并
    const texts = [`[🔎] 引用查找结果 >>>`];
    if (nodeRefs.length > 0) {
      nodeRefs.unshift(`　　　📙 节点引用 x ${nodeRefsCount}`);
      texts.push(...nodeRefs);
    }
    if (assetRefs.length > 0) {
      assetRefs.unshift(`　　　📘 资源引用 x ${assetRefsCount}`);
      texts.push(...assetRefs);
    }
    texts.push(`${'----'.repeat(36)}`);
    if (this.expand) {
      for (let i = 0; i < texts.length; i++) {
        Editor.log(texts[i]);
      }
    } else {
      const content = texts.join('\n');
      Editor.log(content);
    }
  },

  /**
   * 更新节点树
   * @param {string} filePath 文件路径
   */
  updateNodeTree(filePath) {
    if (!this.nodeTrees) {
      this.nodeTrees = Object.create(null);
    }
    const data = JSON.parse(Fs.readFileSync(filePath));
    this.nodeTrees[filePath] = this.convertToNodeTree(data);
  },

  /**
   * 获取节点树
   * @param {string} filePath 文件路径
   * @returns {object}
   */
  getNodeTree(filePath) {
    if (!this.nodeTrees) {
      this.nodeTrees = Object.create(null);
    }
    // 将资源数据转为节点树
    if (!this.nodeTrees[filePath]) {
      const data = JSON.parse(Fs.readFileSync(filePath));
      this.nodeTrees[filePath] = this.convertToNodeTree(data);
    }
    return this.nodeTrees[filePath];
  },

  /**
   * 预加载节点树（未使用）
   */
  preloadNodeTrees() {
    const handler = (filePath, stats) => {
      const extname = Path.extname(filePath);
      if (extname === '.fire' || extname === '.scene' || extname === '.prefab') {
        this.updateNodeTree(filePath);
      }
    }
    const rootPath = Path.join(Editor.Project.path, 'assets');
    FileUtil.map(rootPath, handler);
  },

  /**
   * 将资源数据转为节点树
   * @param {object} data 元数据
   * @returns {object}
   */
  convertToNodeTree(data) {
    /**
     * 读取节点
     * @param {object} node 节点
     * @param {number} id ID
     */
    const read = (node, id) => {
      const nodeData = Object.create(null);
      const actualNodeData = data[id];

      // 基本信息
      nodeData['__id__'] = id;
      nodeData['_name'] = actualNodeData['_name'];
      nodeData['__type__'] = actualNodeData['__type__'];

      // 记录路径
      const parentPath = node['path'] ? node['path'] : (node['_name'] ? node['_name'] : null);
      nodeData['path'] = (parentPath ? parentPath + '/' : '') + nodeData['_name'];

      // 记录组件
      const components = actualNodeData['_components'];
      if (components && components.length > 0) {
        nodeData['components'] = [];
        for (let i = 0; i < components.length; i++) {
          const actualComponent = data[components[i]['__id__']];
          nodeData['components'].push(this.extractValidInfo(actualComponent));
        }
      }

      // 记录预制体引用
      const prefab = actualNodeData['_prefab'];
      if (prefab) {
        const realPrefab = data[prefab['__id__']];
        nodeData['prefab'] = this.extractValidInfo(realPrefab);
      }

      // 记录子节点
      const children = actualNodeData['_children'];
      if (children && children.length > 0) {
        nodeData['children'] = [];
        for (let i = 0; i < children.length; i++) {
          const nodeId = children[i]['__id__'];
          read(nodeData, nodeId);
        }
      }

      // 推入引用容器
      node['children'].push(nodeData);
    }

    // 读取
    const tree = Object.create(null);
    const type = data[0]['__type__'];
    if (type === 'cc.SceneAsset') {
      // 场景资源
      tree['__type__'] = 'cc.Scene';
      tree['children'] = [];
      const sceneId = data[0]['scene']['__id__'];
      tree['__id__'] = sceneId;
      const nodes = data[sceneId]['_children'];
      for (let i = 0; i < nodes.length; i++) {
        const nodeId = nodes[i]['__id__'];
        read(tree, nodeId);
      }
    } else if (type === 'cc.Prefab') {
      // 预制体资源
      tree['__type__'] = 'cc.Prefab';
      for(let i = data.length - 1; i >= 0; i--){
        if (data[i]["asset"]){
          tree['__uuid__'] = data[i]['asset']['__uuid__'];    
          break;
        }
      }
      // tree['__uuid__'] = data[data.length - 1]['asset']['__uuid__'];   // debug 最后一个可能不是cc.PrefabInfo而是cc.Widget
      tree['children'] = [];
      const rootId = data[0]['data']['__id__'];
      read(tree, rootId);
    }
    return tree;
  },

  /**
   * 提取有效信息（含有 uuid）
   * @param {object} data 元数据
   * @returns {object}
   */
  extractValidInfo(data) {
    const info = Object.create(null);
    // 记录有用的属性
    const keys = ['__type__', '_name', 'fileId'];
    for (let i = 0; i < keys.length; i++) {
      if (data[keys[i]]) {
        info[keys[i]] = data[keys[i]];
      }
    }
    // 记录包含 uuid 的属性
    for (const key in data) {
      if (ObjectUtil.containsProperty(data[key], '__uuid__')) {
        info[key] = data[key];
      }
    }
    return info;
  },

  /**
   * 获取对象中是否包含指定值以及相应属性名
   * @param {object} object 对象
   * @param {any} value 值
   * @returns {{contains:boolean, property?:string}}
   */
  getContainsInfo(object, value) {
    const result = {
      contains: false,
      property: null
    }
    const search = (_object, parentKey) => {
      if (ObjectUtil.isObject(_object)) {
        for (const key in _object) {
          if (_object[key] === value) {
            result.contains = true;
            result.property = parentKey;
            return;
          }
          search(_object[key], key);
        }
      } else if (Array.isArray(_object)) {
        for (let i = 0; i < _object.length; i++) {
          search(_object[i], parentKey);
        }
      }
    }
    search(object, null);
    return result;
  }

}

/** 扩展名对应文件类型 */
const typeMap = {
  '.fire': '场景',
  '.scene': '场景',
  '.prefab': '预制体',
  '.anim': '动画',
  '.mtl': '材质',
  '.fnt.meta': '字体',
}
