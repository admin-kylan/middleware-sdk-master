/**.
 * @author  Administrator
 * @date   2017/10/20 10:48
 */

import Constant from './../util/constant'

function TableEventInit(self) {
    self.parentVue.$off(Constant.emitListenerReceiveName);
    self.parentVue.$off(Constant.emitListenerSearchName);
    self.parentVue.$off(Constant.emitListenerSelectionButtonName);
    self.parentVue.$off(Constant.emitListenerReLoaderChangePage);
}

export default TableEventInit;