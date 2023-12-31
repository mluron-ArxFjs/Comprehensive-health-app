import { Component, EmitType, ModuleDeclaration, L10n } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { Splitter } from '@syncfusion/ej2-layouts';
import { Dialog } from '@syncfusion/ej2-popups';
import { ToolbarSettingsModel } from '../models/index';
import { NavigationPaneSettingsModel, DetailsViewSettingsModel } from '../models/index';
import { AjaxSettingsModel, SearchSettingsModel } from '../models/index';
import { Toolbar } from '../actions/toolbar';
import { DetailsView } from '../layout/details-view';
import { LargeIconsView } from '../layout/large-icons-view';
import { Uploader, FileInfo } from '@syncfusion/ej2-inputs';
import { UploadSettingsModel } from '../models/upload-settings-model';
import { FileManagerModel } from './file-manager-model';
import { ITreeView, IContextMenu, ViewType, SortOrder, FileDragEventArgs, RetryArgs, FileSelectionEventArgs } from './interface';
import { BeforeSendEventArgs, SuccessEventArgs, FailureEventArgs, FileLoadEventArgs } from './interface';
import { FileOpenEventArgs, FileSelectEventArgs, MenuClickEventArgs, MenuOpenEventArgs } from './interface';
import { ToolbarClickEventArgs, ToolbarCreateEventArgs, UploadListCreateArgs } from './interface';
import { PopupOpenCloseEventArgs, BeforePopupOpenCloseEventArgs, BeforeDownloadEventArgs, BeforeImageLoadEventArgs } from './interface';
import { TreeView as BaseTreeView } from '@syncfusion/ej2-navigations';
import { ContextMenuSettingsModel } from '../models/contextMenu-settings-model';
import { BreadCrumbBar } from '../actions/breadcrumb-bar';
import { PositionModel } from '@syncfusion/ej2-base/src/draggable-model';
import { Virtualization } from '../actions/virtualization';
/**
 * The FileManager component allows users to access and manage the file system through the web  browser. It can performs the
 * functionalities like add, rename, search, sort, upload and delete files or folders. And also it
 * provides an easy way of  dynamic injectable modules like toolbar, navigationpane, detailsview, largeiconsview.
 * ```html
 *  <div id="file"></div>
 * ```
 * ```typescript,
 *  let feObj: FileManager = new FileManager();
 *  feObj.appendTo('#file');
 * ```
 */
export declare class FileManager extends Component<HTMLElement> implements INotifyPropertyChanged {
    /** @hidden */
    toolbarModule: Toolbar;
    /** @hidden */
    detailsviewModule: DetailsView;
    /** @hidden */
    navigationpaneModule: ITreeView;
    /** @hidden */
    largeiconsviewModule: LargeIconsView;
    /** @hidden */
    contextmenuModule: IContextMenu;
    /** @hidden */
    breadcrumbbarModule: BreadCrumbBar;
    /** @hidden */
    virtualizationModule: Virtualization;
    private keyboardModule;
    private keyConfigs;
    filterData: Object;
    originalPath: string;
    filterPath: string;
    filterId: string;
    hasId: boolean;
    pathNames: string[];
    pathId: string[];
    expandedId: string;
    itemData: Object[];
    visitedData: Object;
    visitedItem: Element;
    toolbarSelection: boolean;
    targetPath: string;
    feParent: Object[];
    feFiles: Object[];
    activeElements: Element[];
    activeModule: string;
    targetModule: string;
    treeObj: BaseTreeView;
    dialogObj: Dialog;
    viewerObj: Dialog;
    extDialogObj: Dialog;
    selectedNodes: string[];
    duplicateItems: string[];
    duplicateRecords: Object[];
    previousPath: string[];
    nextPath: string[];
    fileAction: string;
    pasteNodes: string[];
    isLayoutChange: boolean;
    replaceItems: string[];
    createdItem: {
        [key: string]: Object;
    };
    layoutSelectedItems: string[];
    renamedItem: {
        [key: string]: Object;
    };
    renamedId: string;
    uploadItem: string[];
    fileLength: number;
    deleteRecords: string[];
    fileView: string;
    isDevice: boolean;
    isMobile: boolean;
    isBigger: boolean;
    isFile: boolean;
    actionRecords: Object[];
    activeRecords: Object[];
    isCut: boolean;
    isSearchCut: boolean;
    isSearchDrag: boolean;
    isPasteError: boolean;
    folderPath: string;
    isSameAction: boolean;
    currentItemText: string;
    renameText: string;
    isFiltered: boolean;
    isSortByClicked: boolean;
    enablePaste: boolean;
    splitterObj: Splitter;
    persistData: boolean;
    breadCrumbBarNavigation: HTMLElement;
    localeObj: L10n;
    uploadObj: Uploader;
    uploadDialogObj: Dialog;
    retryArgs: RetryArgs[];
    private isOpened;
    isRetryOpened: boolean;
    isPathDrag: boolean;
    searchedItems: {
        [key: string]: Object;
    }[];
    searchWord: string;
    retryFiles: FileInfo[];
    isApplySame: boolean;
    uploadEventArgs: BeforeSendEventArgs;
    dragData: {
        [key: string]: Object;
    }[];
    dragNodes: string[];
    dragPath: string;
    dropPath: string;
    isDragDrop: boolean;
    virtualDragElement: HTMLElement;
    dropData: Object;
    treeExpandTimer: number;
    dragCursorPosition: PositionModel;
    isDropEnd: boolean;
    dragCount: number;
    droppedObjects: Object[];
    destinationPath: string;
    uploadingCount: number;
    uploadedCount: number;
    isMac: boolean;
    oldView: string;
    oldPath: string;
    /**
     * Specifies the AJAX settings of the file manager.
     *
     * @default {
     *  getImageUrl: null;
     *  url: null;
     *  uploadUrl: null;
     *  downloadUrl: null;
     * }
     */
    ajaxSettings: AjaxSettingsModel;
    /**
     * Enables or disables drag-and-drop of files.
     *
     * @default false
     */
    allowDragAndDrop: boolean;
    /**
     * Enables or disables the multiple files selection of the file manager.
     *
     * @default true
     */
    allowMultiSelection: boolean;
    /**
     * Gets or sets a boolean value that determines whether to display checkboxes in the file manager. If enabled, checkboxes are shown for files or folders on hover.
     *
     * @default true
     */
    showItemCheckBoxes: boolean;
    /**
     * Specifies the context menu settings of the file manager.
     *
     * @default {
     *  file: ['Open','|', 'Cut', 'Copy', '|', 'Delete', 'Rename', '|', 'Details'],
     *  folder: ['Open','|', 'Cut', 'Copy', 'Paste', '|', 'Delete', 'Rename', '|', 'Details'],
     *  layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', 'Upload', '|', 'Details', '|', 'SelectAll'],
     *  visible: true,
     * }
     */
    contextMenuSettings: ContextMenuSettingsModel;
    /**
     * Specifies the root CSS class of the file manager that allows you to customize the appearance by overriding the styles.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies the details view settings of the file manager.
     *
     * @default {
     * columns: [{
     * field: 'name', headerText: 'Name', minWidth: 120, template: '<span class="e-fe-text">${name}</span>',
     * customAttributes: { class: 'e-fe-grid-name'}}, { field: '_fm_modified', headerText: 'DateModified', type: 'dateTime',
     * format: 'MMMM dd, yyyy HH:mm', minWidth: 120, width: '190' }, { field: 'size', headerText: 'Size', minWidth: 90, width: '110',
     * template: '<span class="e-fe-size">${size}</span>' }
     * ]
     * }
     */
    detailsViewSettings: DetailsViewSettingsModel;
    /**
     * Defines whether to allow the cross-scripting site or not.
     *
     * @default true
     */
    enableHtmlSanitizer: boolean;
    /**
     * Enables or disables persisting component's state between page reloads. If enabled, the following APIs will persist:
     * 1. `view`: Represents the previous view of the file manager.
     * 2. `path`: Represents the previous path of the file manager.
     * 3. `selectedItems`: Represents the previous selected items in the file manager.
     *
     * @default false
     */
    enablePersistence: boolean;
    /**
     * Gets or sets a value that enables/disables the virtualization feature of the File Manager.
     * When enabled, the File Manager will only load a subset of files and folders based on the size of the view port, with the rest being loaded dynamically as the user scrolls vertically through the list.
     * This can improve performance when dealing with a large number of files and folders, as it reduces the initial load time and memory usage.
     *
     * @default false
     */
    enableVirtualization: boolean;
    /**
     * Specifies the height of the file manager.
     *
     * @default '400px'
     */
    height: string | number;
    /**
     * Specifies the initial view of the file manager.
     * With the help of this property, initial view can be changed to details or largeicons view. The available views are:
     * * `LargeIcons`
     * * `Details`
     *
     * @default 'LargeIcons'
     */
    view: ViewType;
    /**
     * Specifies the navigationpane settings of the file manager.
     *
     * @default {
     *  maxWidth: '650px',
     *  minWidth: '240px',
     *  visible: true,
     *  sortOrder: 'None'
     * }
     */
    navigationPaneSettings: NavigationPaneSettingsModel;
    /**
     * Specifies the current path of the file manager.
     *
     * @default '/'
     */
    path: string;
    /**
     * Specifies the target element in which the File Manager’s dialog will be displayed.
     * The default value is null, which refers to the File Manager element.
     *
     * @default null
     */
    popupTarget: HTMLElement | string;
    /**
     * Specifies the search settings of the file manager.
     *
     * @default {
     *  allowSearchOnTyping: true,
     *  filterType: 'contains',
     *  ignoreCase: true
     * }
     */
    searchSettings: SearchSettingsModel;
    /**
     * Specifies the selected folders and files name of the  file manager.
     *
     * @default []
     */
    selectedItems: string[];
    /**
     * Shows or hides the file extension in file manager.
     *
     * @default true
     */
    showFileExtension: boolean;
    /**
     * Specifies the root folder alias name in file manager
     *
     * @default null
     */
    rootAliasName: string;
    /**
     * Shows or hides the files and folders that are marked as hidden.
     *
     * @default false
     */
    showHiddenItems: boolean;
    /**
     * Shows or hides the thumbnail images in largeicons view.
     *
     * @default true
     */
    showThumbnail: boolean;
    /**
     * Specifies a value that indicates whether the folders and files are sorted in the ascending or descending order,
     * or they are not sorted at all. The available types of sort orders are,
     * `None` - Indicates that the folders and files are not sorted.
     * `Ascending` - Indicates that the folders and files are sorted in the ascending order.
     * `Descending` - Indicates that the folders and files are sorted in the descending order.
     *
     * @default 'Ascending'
     */
    sortOrder: SortOrder;
    /**
     * Specifies the field name being used as the sorting criteria to sort the files of the file manager component.
     *
     * @default 'name'
     */
    sortBy: string;
    /**
     * Specifies the group of items aligned horizontally in the toolbar.
     *
     * @default {
     *  items: ['NewFolder', 'Upload', 'Cut', 'Copy', 'Paste', 'Delete',
     *  'Download', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'],
     *  visible: true
     * }
     */
    toolbarSettings: ToolbarSettingsModel;
    /**
     * Specifies the upload settings for the file manager.
     *
     * @default {
     *  autoUpload: true,
     *  minFileSize: 0,
     *  maxFileSize: 30000000,
     *  allowedExtensions: '',
     *  autoClose: false,
     *  directoryUpload: false
     * }
     */
    uploadSettings: UploadSettingsModel;
    /**
     * Specifies the width of the file manager.
     *
     * @default '100%'
     */
    width: string | number;
    /**
     * Triggers before the file/folder is rendered.
     *
     * @event
     */
    fileLoad: EmitType<FileLoadEventArgs>;
    /**
     * Triggers before the file/folder is opened.
     *
     * @event
     */
    fileOpen: EmitType<FileOpenEventArgs>;
    /**
     * Triggers before sending the download request to the server.
     *
     * @event
     */
    beforeDownload: EmitType<BeforeDownloadEventArgs>;
    /**
     * Triggers before sending the getImage request to the server.
     *
     * @event
     */
    beforeImageLoad: EmitType<BeforeImageLoadEventArgs>;
    /**
     * Triggers before the dialog is closed.
     *
     * @event
     */
    beforePopupClose: EmitType<BeforePopupOpenCloseEventArgs>;
    /**
     * Triggers before the dialog is opened.
     *
     * @event
     */
    beforePopupOpen: EmitType<BeforePopupOpenCloseEventArgs>;
    /**
     * Triggers before sending the AJAX request to the server.
     *
     * @event
     */
    beforeSend: EmitType<BeforeSendEventArgs>;
    /**
     * Triggers when the file manager component is created.
     *
     * @event
     */
    created: EmitType<Object>;
    /**
     * Triggers when the file manager component is destroyed.
     *
     * @event
     */
    destroyed: EmitType<Object>;
    /**
     * Triggers when the file/folder dragging is started.
     *
     * @event
     */
    fileDragStart: EmitType<FileDragEventArgs>;
    /**
     * Triggers while dragging the file/folder.
     *
     * @event
     */
    fileDragging: EmitType<FileDragEventArgs>;
    /**
     * Triggers when the file/folder is about to be dropped at the target.
     *
     * @event
     */
    fileDragStop: EmitType<FileDragEventArgs>;
    /**
     * Triggers when the file/folder is dropped.
     *
     * @event
     */
    fileDropped: EmitType<FileDragEventArgs>;
    /**
     * Triggers before the file/folder is selected.
     *
     * @event
     */
    fileSelection: EmitType<FileSelectionEventArgs>;
    /**
     * Triggers when the file/folder is selected/unselected.
     *
     * @event
     */
    fileSelect: EmitType<FileSelectEventArgs>;
    /**
     * Triggers when the context menu item is clicked.
     *
     * @event
     */
    menuClick: EmitType<MenuClickEventArgs>;
    /**
     * Triggers before the context menu is opened.
     *
     * @event
     */
    menuOpen: EmitType<MenuOpenEventArgs>;
    /**
     * Triggers when the AJAX request is failed.
     *
     * @event
     */
    failure: EmitType<FailureEventArgs>;
    /**
     * Triggers when the dialog is closed.
     *
     * @event
     */
    popupClose: EmitType<PopupOpenCloseEventArgs>;
    /**
     * Triggers when the dialog is opened.
     *
     * @event
     */
    popupOpen: EmitType<PopupOpenCloseEventArgs>;
    /**
     * Triggers when the AJAX request is success.
     * @event
     */
    success: EmitType<SuccessEventArgs>;
    /**
     * Triggers when the toolbar item is clicked.
     *
     * @event
     */
    toolbarClick: EmitType<ToolbarClickEventArgs>;
    /**
     * Triggers before creating the toolbar.
     *
     * @event
     */
    toolbarCreate: EmitType<ToolbarCreateEventArgs>;
    /**
     * Triggers before rendering each file item in upload dialog box.
     *
     * @event
     */
    uploadListCreate: EmitType<UploadListCreateArgs>;
    constructor(options?: FileManagerModel, element?: string | HTMLElement);
    /**
     * Get component name.
     *
     * @returns {string} - returns module name.
     * @private
     */
    getModuleName(): string;
    /**
     * Initialize the event handler
     *
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns {string} - returns the persisted data.
     * @hidden
     */
    getPersistData(): string;
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} - returns module declaration.
     * @hidden
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * To Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    protected render(): void;
    private ensurePath;
    private initialize;
    private addWrapper;
    private adjustHeight;
    private splitterResize;
    private splitterAdjust;
    private addCssClass;
    private showSpinner;
    private hideSpinner;
    private onContextMenu;
    private checkMobile;
    private renderFileUpload;
    private renderUploadBox;
    private onFileListRender;
    private updateUploader;
    private onBeforeOpen;
    private onBeforeClose;
    private onOpen;
    private onClose;
    private onUploading;
    private onRemoving;
    private onCancel;
    private onClearing;
    private onSelected;
    private onFileUploadSuccess;
    private onUploadSuccess;
    private onUploadFailure;
    private onInitialEnd;
    private addEventListeners;
    private removeEventListeners;
    private onDetailsInit;
    private resizeHandler;
    private keyActionHandler;
    private wireEvents;
    private unWireEvents;
    private setPath;
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {FileManager} newProp
     * @param  {FileManager} oldProp
     * @returns void
     * @private
     */
    onPropertyChanged(newProp: FileManagerModel, oldProp: FileManagerModel): void;
    private ajaxSettingSetModel;
    private localeSetModelOption;
    /**
     * Triggers when the component is destroyed.
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * Creates a new folder in file manager.
     *
     * @param {string} name – Specifies the name of new folder in current path.
     * If it is not specified, then the default new folder dialog will be opened.
     * @returns {void}
     */
    createFolder(name?: string): void;
    /**
     * Deletes the folders or files from the given unique identifiers.
     *
     * @param {string} ids - Specifies the name of folders or files in current path. If you want to delete the nested level folders or
     * files, then specify the filter path along with name of the folders or files when performing the search or custom filtering.
     * For ID based file provider, specify the unique identifier of folders or files.
     * If it is not specified, then delete confirmation dialog will be opened for selected item.
     *
     * @returns {void}
     */
    deleteFiles(ids?: string[]): void;
    /**
     * Disables the specified toolbar items of the file manager.
     *
     * @param {string[]} items - Specifies an array of items to be disabled.
     * @returns {void}
     */
    disableToolbarItems(items: string[]): void;
    /**
     * Downloads the folders or files from the given unique identifiers.
     *
     * @param {string} ids - Specifies the name of folders or files in current path. If you want to download the nested level folders
     * or files, then specify the filter path along with name of the folders or files when performing search or custom filtering.
     * For ID based file provider, specify the unique identifier of folders or files.
     * If it is not specified, then the selected items will be downloaded.
     *
     * @returns {void}
     */
    downloadFiles(ids?: string[]): void;
    /**
     * Enables the specified toolbar items of the file manager.
     *
     * @param {string[]} items - Specifies an array of items to be enabled.
     * @returns {void}
     */
    enableToolbarItems(items: string[]): void;
    /**
     * Disables the specified context menu items in file manager. This method is used only in the menuOpen event.
     *
     * @param {string[]} items - Specifies an array of items to be disabled.
     * @returns {void}
     */
    disableMenuItems(items: string[]): void;
    /**
     * Returns the index position of given current context menu item in file manager.
     *
     * @param {string} item - Specifies an item to get the index position.
     * @returns {number} - returns menu item index.
     */
    getMenuItemIndex(item: string): number;
    /**
     * Returns the index position of given toolbar item in file manager.
     *
     * @param {string} item - Specifies an item to get the index position.
     * @returns {number} - returns toolbar item index.
     */
    getToolbarItemIndex(item: string): number;
    /**
     * Display the custom filtering files in file manager.
     *
     * @param {Object} filterData - Specifies the custom filter details along with custom file action name,
     * which needs to be sent to the server side. If you do not specify the details, then default action name will be `filter`.
     *
     * @returns {void}
     */
    filterFiles(filterData?: Object): void;
    /**
     * Gets the details of the selected files in the file manager.
     *
     * @returns {Object[]} - returns selected files.
     */
    getSelectedFiles(): Object[];
    /**
     * Opens the corresponding file or folder from the given unique identifier.
     *
     * @param {string} id - Specifies the name of folder or file in current path. If you want to open the nested level folder or
     * file, then specify the filter path along with name of the folder or file when performing search or custom filtering. For ID based
     * file provider, specify the unique identifier of folder or file.
     *
     * @returns {void}
     */
    openFile(id: string): void;
    /**
     * Refreshes the folder files of the file manager.
     *
     * @returns {void}
     */
    refreshFiles(): void;
    /**
     * Refreshes the layout of the file manager.
     *
     * @returns {void}
     */
    refreshLayout(): void;
    /**
     * Selects the entire folders and files in current path.
     *
     * @returns {void}
     */
    selectAll(): void;
    /**
     * Deselects the currently selected folders and files in current path.
     *
     * @returns {void}
     */
    clearSelection(): void;
    /**
     * Renames the file or folder with given new name in file manager.
     *
     * @param {string} id - Specifies the name of folder or file in current path. If you want to rename the nested level folder or
     * file, then specify the filter path along with name of the folder or file when performing search or custom filtering. For ID based
     * file provider, specify the unique identifier of folder or file.
     * If it is not specified, then rename dialog will be opened for selected item.
     *
     * @param {string} name – Specifies the new name of the file or folder in current path. If it is not specified, then rename dialog
     * will be opened for given identifier.
     *
     * @returns {void}
     */
    renameFile(id?: string, name?: string): void;
    /**
     * Opens the upload dialog in file manager.
     *
     * @returns {void}
     */
    uploadFiles(): void;
    /**
     * Specifies the direction of FileManager
     *
     * @param {boolean} rtl - specifies rtl parameter.
     * @returns {void}
     */
    private setRtl;
}
