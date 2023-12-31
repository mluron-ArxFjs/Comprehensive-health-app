import { createElement, Browser, isBlazor, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
import { ListView } from '@syncfusion/ej2-lists';
import { AjaxHandler } from '../index';
/**
 * BookmarkView module
 */
var BookmarkView = /** @class */ (function () {
    /**
     * @param pdfViewer
     * @param pdfViewerBase
     * @param pdfViewer
     * @param pdfViewerBase
     * @private
     */
    function BookmarkView(pdfViewer, pdfViewerBase) {
        var _this = this;
        /**
         * @private
         */
        this.childNavigateCount = 0;
        // eslint-disable-next-line
        this.bookmarkClick = function (args) {
            // eslint-disable-next-line
            if (!args.event.target.classList.contains('e-icons')) {
                var bookid = args.data.Id;
                _this.childNavigateCount = 0;
                _this.pdfViewerBase.navigationPane.goBackToToolbar();
                // eslint-disable-next-line
                var selectedItem = _this.bookmarkList.getSelectedItems();
                _this.navigateToBookmark(bookid, args.text, selectedItem.data.FileName);
            }
            else {
                _this.childNavigateCount++;
            }
            return false;
        };
        this.nodeClick = function (args) {
            _this.setHeight(args.node);
            var bookid = Number(args.nodeData.id);
            // eslint-disable-next-line
            var data = _this.treeObj.getTreeData(args.node);
            _this.navigateToBookmark(bookid, args.node.textContent, data[0].FileName);
            if (_this.pdfViewer.annotationModule && _this.pdfViewer.annotationModule.inkAnnotationModule) {
                // eslint-disable-next-line
                var currentPageNumber = parseInt(_this.pdfViewer.annotationModule.inkAnnotationModule.currentPageNumber);
                _this.pdfViewer.annotationModule.inkAnnotationModule.drawInkAnnotation(currentPageNumber);
            }
            return false;
        };
        this.bookmarkPanelBeforeOpen = function (args) {
            if (_this.pdfViewer.enableBookmarkStyles) {
                for (var k = 0; k < _this.bookmarkStyles.length; k++) {
                    if ((args.text.trim()) === (_this.bookmarkStyles[k].Text.trim())) {
                        // eslint-disable-next-line
                        var element = args.node.lastElementChild;
                        if (element) {
                            // eslint-disable-next-line
                            var fontStyle = _this.bookmarkStyles[k].FontStyle.split(',');
                            for (var n = 0; n < fontStyle.length; n++) {
                                switch (fontStyle[n].trim()) {
                                    case 'Italic':
                                        element.style.fontStyle = 'italic';
                                        break;
                                    case 'Bold':
                                        element.style.fontWeight = 'Bold';
                                }
                            }
                            // eslint-disable-next-line
                            var currentElement = element.getElementsByClassName('e-pv-bookmark-title')[0];
                            if (currentElement) {
                                currentElement.style.color = _this.bookmarkStyles[k].Color;
                            }
                            else {
                                element.children[0].style.color = _this.bookmarkStyles[k].Color;
                            }
                        }
                        break;
                    }
                }
            }
        };
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @private
     */
    BookmarkView.prototype.createRequestForBookmarks = function () {
        var proxy = this;
        // eslint-disable-next-line max-len
        var jsonObject = { hashId: this.pdfViewerBase.hashId, action: 'Bookmarks', elementId: this.pdfViewer.element.id, uniqueId: this.pdfViewerBase.documentId };
        if (this.pdfViewerBase.jsonDocumentId) {
            // eslint-disable-next-line
            jsonObject.documentId = this.pdfViewerBase.jsonDocumentId;
        }
        if (this.pdfViewer.enableBookmarkStyles) {
            // eslint-disable-next-line
            jsonObject.bookmarkStyles = this.pdfViewer.enableBookmarkStyles;
        }
        this.bookmarkRequestHandler = new AjaxHandler(this.pdfViewer);
        this.bookmarkRequestHandler.url = proxy.pdfViewer.serviceUrl + '/Bookmarks';
        this.bookmarkRequestHandler.responseType = 'json';
        this.bookmarkRequestHandler.send(jsonObject);
        // eslint-disable-next-line
        this.bookmarkRequestHandler.onSuccess = function (result) {
            if (proxy.pdfViewerBase.navigationPane) {
                proxy.pdfViewerBase.navigationPane.disableBookmarkButton();
            }
            // eslint-disable-next-line
            var data = result.data;
            var redirect = proxy.pdfViewerBase.checkRedirection(data);
            if (!redirect) {
                if (data) {
                    if (typeof data !== 'object') {
                        try {
                            data = JSON.parse(data);
                        }
                        catch (error) {
                            proxy.pdfViewerBase.onControlError(500, data, 'Bookmarks');
                            data = null;
                        }
                    }
                    if (data && data.uniqueId === proxy.pdfViewerBase.documentId) {
                        proxy.pdfViewer.fireAjaxRequestSuccess('Bookmarks', data);
                        proxy.bookmarks = { bookMark: data.Bookmarks };
                        proxy.bookmarkStyles = data.Bookmarkstyles;
                        proxy.bookmarksDestination = { bookMarkDestination: data.BookmarksDestination };
                        if (isBlazor()) {
                            // eslint-disable-next-line
                            var bookmarkCollection = { bookmarks: proxy.bookmarks, bookmarksDestination: proxy.bookmarksDestination };
                            if (proxy.pdfViewer && proxy.pdfViewer._dotnetInstance) {
                                proxy.pdfViewer._dotnetInstance.invokeMethodAsync('UpdateBookmarkCollection', bookmarkCollection);
                            }
                        }
                    }
                }
                if (proxy.pdfViewerBase.navigationPane) {
                    if (proxy.bookmarks == null) {
                        proxy.pdfViewerBase.navigationPane.disableBookmarkButton();
                        if (isBlazor() && proxy.pdfViewer._dotnetInstance) {
                            proxy.pdfViewer._dotnetInstance.invokeMethodAsync('UpdateBookmarkCollection', null);
                        }
                    }
                    else {
                        proxy.pdfViewerBase.navigationPane.enableBookmarkButton();
                        proxy.isBookmarkViewDiv = false;
                        if (proxy.pdfViewer.isBookmarkPanelOpen) {
                            proxy.pdfViewerBase.navigationPane.openBookmarkcontentInitially();
                        }
                    }
                }
            }
        };
        // eslint-disable-next-line
        this.bookmarkRequestHandler.onFailure = function (result) {
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, 'Bookmarks');
        };
        // eslint-disable-next-line
        this.bookmarkRequestHandler.onError = function (result) {
            proxy.pdfViewerBase.openNotificationPopup();
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, 'Bookmarks');
        };
    };
    /**
     * @private
     */
    BookmarkView.prototype.renderBookmarkcontent = function () {
        var _this = this;
        if (!this.isBookmarkViewDiv) {
            var isblazor = isBlazor();
            // eslint-disable-next-line max-len
            this.bookmarkView = isblazor ? this.pdfViewer.element.querySelector('.e-pv-bookmark-view') : createElement('div', { id: this.pdfViewer.element.id + '_bookmark_view', className: 'e-pv-bookmark-view' });
            this.pdfViewerBase.navigationPane.sideBarContent.appendChild(this.bookmarkView);
            // eslint-disable-next-line max-len
            var bookmarkIconView_1 = createElement('div', { id: this.pdfViewer.element.id + '_bookmark_iconview', className: 'e-pv-bookmark-icon-view' });
            // eslint-disable-next-line max-len
            if (!this.pdfViewer.enableRtl) {
                // eslint-disable-next-line max-len
                var bookmarkIcon = createElement('span', { id: this.pdfViewer.element.id + '_bookmark_icon', className: 'e-pv-bookmark-icon e-pv-icon' });
                bookmarkIconView_1.appendChild(bookmarkIcon);
            }
            else {
                // eslint-disable-next-line max-len
                var bookmarkIcon = createElement('span', { id: this.pdfViewer.element.id + '_bookmark_icon', className: 'e-pv-bookmark-icon e-pv-icon e-right' });
                bookmarkIconView_1.appendChild(bookmarkIcon);
            }
            // eslint-disable-next-line max-len
            var bookmarkTitle = createElement('div', { id: this.pdfViewer.element.id + '_bookmark_Title', className: 'e-pv-bookmark-title' });
            if (this.pdfViewer.enableRtl) {
                bookmarkTitle.style.paddingRight = 26 + 'px';
            }
            bookmarkTitle.innerText = '${Title}';
            bookmarkIconView_1.appendChild(bookmarkTitle);
            if (!isblazor) {
                // eslint-disable-next-line max-len
                this.treeObj = new TreeView({
                    fields: {
                        dataSource: this.bookmarks.bookMark,
                        id: 'Id',
                        text: 'Title',
                        child: 'Child',
                        hasChildren: 'HasChild'
                    },
                    nodeTemplate: initializeCSPTemplate(function (data) { return bookmarkIconView_1.outerHTML.replace('${Title}', data.Title); }),
                    nodeSelected: this.nodeClick.bind(this),
                    drawNode: this.bookmarkPanelBeforeOpen.bind(this)
                });
                this.treeObj.isStringTemplate = true;
                if (this.pdfViewer.enableRtl) {
                    this.treeObj.enableRtl = true;
                }
                this.treeObj.appendTo(this.bookmarkView);
            }
            // eslint-disable-next-line
            var event_1 = ['mouseover', 'keydown'];
            for (var m = 0; m < event_1.length; m++) {
                this.bookmarkView.addEventListener(event_1[m], function (event) {
                    _this.setHeight(event.target);
                });
            }
            this.isBookmarkViewDiv = true;
        }
        this.bookmarkView.style.display = 'block';
    };
    /**
     * @private
     */
    BookmarkView.prototype.renderBookmarkContentMobile = function () {
        if (this.bookmarkView != null) {
            this.bookmarkView.remove();
        }
        this.bookmarkView = createElement('div', { id: this.pdfViewer.element.id + '_bookmark_view', className: 'e-pv-bookmark-view' });
        this.pdfViewerBase.getElement('_bookmarks_container').appendChild(this.bookmarkView);
        this.bookmarkList = new ListView({
            dataSource: this.bookmarks.bookMark,
            fields: {
                id: 'Id',
                text: 'Title',
                child: 'Child'
            },
            showHeader: false,
            select: this.bookmarkClick.bind(this)
        });
        this.bookmarkList.isStringTemplate = true;
        if (this.pdfViewer.enableRtl) {
            this.bookmarkList.enableRtl = true;
        }
        this.bookmarkList.appendTo(this.bookmarkView);
    };
    // eslint-disable-next-line
    BookmarkView.prototype.setHeight = function (element) {
        if (this.treeObj) {
            if (this.treeObj.fullRowSelect && element.classList) {
                if (element.classList.contains('e-treeview') && element.classList.contains('.e-active')) {
                    element = element.querySelector('.e-active').querySelector('.e-fullrow');
                }
                else if (element.classList.contains('e-treeview')) {
                    element = element.querySelector('.e-fullrow');
                }
                else if (element.classList.contains('e-list-parent')) {
                    element = element.querySelector('.e-fullrow');
                }
                else if (element.classList.value !== ('e-fullrow')) {
                    if (element.closest && element.closest('.e-list-item')) {
                        element = element.closest('.e-list-item').querySelector('.e-fullrow');
                    }
                    else {
                        if (element.classList.contains('e-list-item')) {
                            element = element.querySelector('.e-fullrow');
                        }
                        else if (element.classList.contains('e-icons') && element.classList.contains('interaction')
                            && element.parentElement.parentElement.classList.contains('e-list-item')) {
                            element = element.parentElement.parentElement.querySelector('.e-fullrow');
                        }
                    }
                }
                if (element.nextElementSibling) {
                    element.style.height = element.nextElementSibling.offsetHeight + 'px';
                }
            }
        }
    };
    /**
     * @private
     */
    BookmarkView.prototype.setBookmarkContentHeight = function () {
        if (this.treeObj) {
            // eslint-disable-next-line
            var element = this.treeObj.element;
            if (this.treeObj.fullRowSelect) {
                if (element.classList.contains('e-treeview') && element.classList.contains('.e-active')) {
                    element = element.querySelector('.e-active').querySelector('.e-fullrow');
                }
                else if (element.classList.contains('e-treeview')) {
                    element = element.querySelector('.e-fullrow');
                }
                if (element.nextElementSibling) {
                    element.style.height = element.nextElementSibling.offsetHeight + 'px';
                }
            }
        }
    };
    BookmarkView.prototype.navigateToBookmark = function (bookid, text, fileName) {
        var pageIndex = this.bookmarksDestination.bookMarkDestination[bookid].PageIndex;
        var Y = this.bookmarksDestination.bookMarkDestination[bookid].Y;
        if (pageIndex !== -1) {
            this.goToBookmark(pageIndex, Y);
        }
        this.pdfViewer.fireBookmarkClick(pageIndex !== -1 ? pageIndex + 1 : pageIndex, Y, text, fileName);
    };
    /**
     * Get Bookmarks of the PDF document being loaded in the ejPdfViewer control
     *
     * @returns any
     */
    // eslint-disable-next-line
    BookmarkView.prototype.getBookmarks = function () {
        if (this.bookmarks && this.bookmarksDestination) {
            // eslint-disable-next-line max-len
            return { bookmarks: this.bookmarks, bookmarksDestination: this.bookmarksDestination };
        }
    };
    /**
     * Navigate To current Bookmark location of the PDF document being loaded in the ejPdfViewer control.
     *
     * @param  {number} pageIndex - Specifies the pageIndex for Navigate
     * @param  {number} y - Specifies the Y coordinates value of the Page
     * @returns void
     */
    BookmarkView.prototype.goToBookmark = function (pageIndex, y) {
        var proxy = this;
        var destPage = (this.pdfViewerBase.pageSize[pageIndex].height);
        var scrollValue;
        if (y === 0) {
            scrollValue = this.pdfViewerBase.pageSize[pageIndex].top * this.pdfViewerBase.getZoomFactor();
        }
        else {
            // eslint-disable-next-line max-len
            scrollValue = this.pdfViewerBase.pageSize[pageIndex].top * this.pdfViewerBase.getZoomFactor() + ((destPage - y) * this.pdfViewerBase.getZoomFactor());
        }
        var scroll = scrollValue.toString();
        // eslint-disable-next-line radix
        proxy.pdfViewerBase.viewerContainer.scrollTop = parseInt(scroll);
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            this.pdfViewerBase.mobileScrollerContainer.style.display = '';
            this.pdfViewerBase.updateMobileScrollerPosition();
        }
        proxy.pdfViewerBase.focusViewerContainer();
        return false;
    };
    /**
     * @private
     */
    BookmarkView.prototype.clear = function () {
        if (this.pdfViewerBase.navigationPane) {
            this.pdfViewerBase.navigationPane.disableBookmarkButton();
            this.pdfViewerBase.navigationPane.updateViewerContainerOnClose();
        }
        if (this.bookmarks) {
            this.bookmarks.bookMark = [];
            this.bookmarks = null;
        }
        if (this.bookmarksDestination) {
            this.bookmarksDestination.bookMarkDestination = [];
        }
        if (this.bookmarkView != null && !isBlazor()) {
            if (this.bookmarkView.parentElement !== null) {
                this.bookmarkView.parentElement.removeChild(this.bookmarkView);
            }
            while (this.bookmarkView.hasChildNodes()) {
                this.bookmarkView.removeChild(this.bookmarkView.lastChild);
            }
        }
        if (this.bookmarkRequestHandler) {
            this.bookmarkRequestHandler.clear();
        }
    };
    /**
     * @private
     */
    BookmarkView.prototype.destroy = function () {
        this.clear();
    };
    /**
     * @private
     */
    BookmarkView.prototype.getModuleName = function () {
        return 'BookmarkView';
    };
    return BookmarkView;
}());
export { BookmarkView };
