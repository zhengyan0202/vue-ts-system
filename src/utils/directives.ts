import Vue from 'vue';

Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl: Element | any = el.querySelector('.el-dialog__header');
    const dragDom: Element | any = el.querySelector('.el-dialog');

    dialogHeaderEl.style.cssText += ';cursor:move;';
    dragDom.style.cssText += ';top:0px;';

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (() => {
      if ((window.document as Document | any).currentStyle) {
        return (dom: Element | any, attr: any) => dom.currentStyle[attr];
      } else {
        return (dom: Element, attr: any) => getComputedStyle(dom, null)[attr];
      }
    })()

    dialogHeaderEl.onmousedown = (e: any) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      const screenWidth = document.body.clientWidth; // body当前宽度
      const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取) 

      const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
      const dragDomheight = dragDom.offsetHeight; // 对话框高度

      const minDragDomLeft = dragDom.offsetLeft;
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

      const minDragDomTop = dragDom.offsetTop;
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;


      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, 'left');
      let styT = sty(dragDom, 'top');

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
      } else {
        styL = +styL.replace(/\px/g, '');
        styT = +styT.replace(/\px/g, '');
      };

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离 
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -(minDragDomLeft);
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-(top) > minDragDomTop) {
          top = -(minDragDomTop);
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }

        // 移动当前元素  
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
})

Vue.directive('loadmore', {
  bind(el:any, binding) {
    let tbody: Element | any  = el.querySelector('.el-table__body-wrapper');
    el.tableInfiniteScrollFn = function() {
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= 1) {
        binding.value();
      }
    }
    tbody.addEventListener('scroll', el.tableInfiniteScrollFn);
    tbody = undefined;
  },
  unbind(el:any) {
    let tbody: Element | any = el.querySelector(".el-table__body-wrapper");
    tbody.removeEventListener("scorll", el.tableInfiniteScrollFn);
    el.tableInfiniteScrollFn = undefined;
  }
})