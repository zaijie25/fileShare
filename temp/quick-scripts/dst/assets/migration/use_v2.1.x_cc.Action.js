
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_v2.1.x_cc.Action.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fe19fOB3u9GoaS4kDUb2/zY', 'use_v2.1.x_cc.Action');
// migration/use_v2.1.x_cc.Action.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with the v2.1.0/2.1.1 version.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Action in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0/2.1.1 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Action，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
// Revert the rotation direction of Actions associated with 2D rotation (such as cc.rotateBy) to keep it consistent with v2.1.0/2.1.1.
// 将跟 2D 旋转相关的 Action （如 cc.rotateBy）的旋转朝向取反，以保持跟 v2.1.0/2.1.1 行为一致。
cc.macro.ROTATE_ACTION_CCW = true;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfdjIuMS54X2NjLkFjdGlvbi5qcyJdLCJuYW1lcyI6WyJjYyIsIm1hY3JvIiwiUk9UQVRFX0FDVElPTl9DQ1ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVNDLGlCQUFULEdBQTZCLElBQTdCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBUaGlzIHNjcmlwdCBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBDb2NvcyBDcmVhdG9yIGFuZCBpcyBvbmx5IHVzZWQgZm9yIHByb2plY3RzIGNvbXBhdGlibGUgd2l0aCB0aGUgdjIuMS4wLzIuMS4xIHZlcnNpb24uXHJcbiAqIFlvdSBkbyBub3QgbmVlZCB0byBtYW51YWxseSBhZGQgdGhpcyBzY3JpcHQgaW4gYW55IG90aGVyIHByb2plY3QuXHJcbiAqIElmIHlvdSBkb24ndCB1c2UgY2MuQWN0aW9uIGluIHlvdXIgcHJvamVjdCwgeW91IGNhbiBkZWxldGUgdGhpcyBzY3JpcHQgZGlyZWN0bHkuXHJcbiAqIElmIHlvdXIgcHJvamVjdCBpcyBob3N0ZWQgaW4gVkNTIHN1Y2ggYXMgZ2l0LCBzdWJtaXQgdGhpcyBzY3JpcHQgdG9nZXRoZXIuXHJcbiAqXHJcbiAqIOatpOiEmuacrOeUsSBDb2NvcyBDcmVhdG9yIOiHquWKqOeUn+aIkO+8jOS7heeUqOS6juWFvOWuuSB2Mi4xLjAvMi4xLjEg54mI5pys55qE5bel56iL77yMXHJcbiAqIOS9oOaXoOmcgOWcqOS7u+S9leWFtuWug+mhueebruS4reaJi+WKqOa3u+WKoOatpOiEmuacrOOAglxyXG4gKiDlpoLmnpzkvaDnmoTpobnnm67kuK3msqHnlKjliLAgQWN0aW9u77yM5Y+v55u05o6l5Yig6Zmk6K+l6ISa5pys44CCXHJcbiAqIOWmguaenOS9oOeahOmhueebruacieaJmOeuoeS6jiBnaXQg562J54mI5pys5bqT77yM6K+35bCG5q2k6ISa5pys5LiA5bm25LiK5Lyg44CCXHJcbiAqL1xyXG5cclxuLy8gUmV2ZXJ0IHRoZSByb3RhdGlvbiBkaXJlY3Rpb24gb2YgQWN0aW9ucyBhc3NvY2lhdGVkIHdpdGggMkQgcm90YXRpb24gKHN1Y2ggYXMgY2Mucm90YXRlQnkpIHRvIGtlZXAgaXQgY29uc2lzdGVudCB3aXRoIHYyLjEuMC8yLjEuMS5cclxuLy8g5bCG6LefIDJEIOaXi+i9rOebuOWFs+eahCBBY3Rpb24g77yI5aaCIGNjLnJvdGF0ZUJ577yJ55qE5peL6L2s5pyd5ZCR5Y+W5Y+N77yM5Lul5L+d5oyB6LefIHYyLjEuMC8yLjEuMSDooYzkuLrkuIDoh7TjgIJcclxuY2MubWFjcm8uUk9UQVRFX0FDVElPTl9DQ1cgPSB0cnVlO1xyXG4iXX0=