import { Component, ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, KeyboardEvents } from '@syncfusion/ej2-base';
import { Column, ColumnModel } from '../models/column';
import { BeforeBatchSaveArgs, BeforeBatchAddArgs, BatchDeleteArgs, BeforeBatchDeleteArgs } from '@syncfusion/ej2-grids';
import { ColumnQueryModeType, HeaderCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { RowDragEventArgs, RowDropSettingsModel } from '@syncfusion/ej2-grids';
import { LoadingIndicatorModel } from '../models/loading-indicator-model';
import { DetailDataBoundEventArgs, ClipMode, ColumnChooser } from '@syncfusion/ej2-grids';
import { SearchEventArgs, AddEventArgs, EditEventArgs, DeleteEventArgs } from '@syncfusion/ej2-grids';
import { SaveEventArgs, CellSaveArgs, BatchAddArgs, BatchCancelArgs, BeginEditArgs, CellEditArgs } from '@syncfusion/ej2-grids';
import { TextWrapSettingsModel } from '../models/textwrap-settings-model';
import { Filter } from '../actions/filter';
import { BeforeCopyEventArgs, BeforePasteEventArgs } from '@syncfusion/ej2-grids';
import { TreeClipboard } from '../actions/clipboard';
import { Aggregate } from '../actions/summary';
import { Reorder } from '../actions/reorder';
import { Resize } from '../actions/resize';
import { Selection as TreeGridSelection } from '../actions/selection';
import { ColumnMenu } from '../actions/column-menu';
import { DetailRow } from '../actions/detail-row';
import { Freeze } from '../actions/freeze-column';
import { Print } from '../actions/print';
import { TreeGridModel } from './treegrid-model';
import { FilterSettingsModel } from '../models/filter-settings-model';
import { SearchSettingsModel } from '../models/search-settings-model';
import { RowInfo, RowDataBoundEventArgs, PageEventArgs, FilterEventArgs, FailureEventArgs, SortEventArgs } from '@syncfusion/ej2-grids';
import { RowSelectingEventArgs, RowSelectEventArgs, RowDeselectEventArgs, IIndex, ISelectedCell } from '@syncfusion/ej2-grids';
import { CellSelectEventArgs, CellDeselectEventArgs } from '@syncfusion/ej2-grids';
import { SelectionSettingsModel } from '../models/selection-settings-model';
import { SortDirection, ColumnDragEventArgs } from '@syncfusion/ej2-grids';
import { PrintMode, Data, ContextMenuItemModel } from '@syncfusion/ej2-grids';
import { ColumnMenuItem, ColumnMenuItemModel, CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';
import { ExcelExportCompleteArgs, ExcelHeaderQueryCellInfoEventArgs, ExcelQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { PdfExportCompleteArgs, PdfHeaderQueryCellInfoEventArgs, PdfQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { ExcelExportProperties, PdfExportProperties, CellSelectingEventArgs, PrintEventArgs } from '@syncfusion/ej2-grids';
import { ColumnMenuOpenEventArgs } from '@syncfusion/ej2-grids';
import { BeforeDataBoundArgs } from '@syncfusion/ej2-grids';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { Grid, QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { Render } from '../renderer/render';
import { DataManipulation } from './data';
import { RowDD } from '../actions/rowdragdrop';
import { Sort } from '../actions/sort';
import { ITreeData, RowExpandedEventArgs, RowCollapsedEventArgs, RowCollapsingEventArgs, TreeGridExcelExportProperties } from './interface';
import { DataStateChangeEventArgs, RowExpandingEventArgs, TreeGridPdfExportProperties } from './interface';
import { GridLine } from '@syncfusion/ej2-grids';
import { DataSourceChangedEventArgs, RecordDoubleClickEventArgs, ResizeArgs } from '@syncfusion/ej2-grids';
import { ToolbarItems, ToolbarItem, ContextMenuItem, RowPosition, CopyHierarchyType } from '../enum';
import { ItemModel, ClickEventArgs, BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { PageSettingsModel } from '../models/page-settings-model';
import { AggregateRowModel } from '../models/summary-model';
import { ExcelExport } from '../actions/excel-export';
import { PdfExport } from '../actions/pdf-export';
import { Toolbar } from '../actions/toolbar';
import { Page } from '../actions/page';
import { ContextMenu } from '../actions/context-menu';
import { EditSettingsModel } from '../models/edit-settings-model';
import { Edit } from '../actions/edit';
import { SortSettingsModel } from '../models/sort-settings-model';
import { InfiniteScrollSettingsModel } from '../models/infinite-scroll-settings-model';
/**
 * Represents the TreeGrid component.
 * ```html
 * <div id='treegrid'></div>
 * <script>
 *  var treegridObj = new TreeGrid({ allowPaging: true });
 *  treegridObj.appendTo('#treegrid');
 * </script>
 * ```
 */
export declare class TreeGrid extends Component<HTMLElement> implements INotifyPropertyChanged {
    constructor(options?: TreeGridModel, element?: Element);
    private defaultLocale;
    private dataResults;
    private l10n;
    dataModule: DataManipulation;
    private registeredTemplate;
    private uniqueIDCollection;
    private uniqueIDFilterCollection;
    private changedRecords;
    private deletedRecords;
    private addedRecords;
    private targetElement;
    private isGantt;
    private isAddedFromGantt;
    private isIndentEnabled;
    private indentOutdentAction;
    private isCollapsedEventTriggered;
    private isCollapsingEventTriggered;
    private isExpandedEventTriggered;
    private isExpandingEventTriggered;
    private collapseAllPrevent;
    private expandAllPrevent;
    /**
     * The `sortModule` is used to manipulate sorting in TreeGrid.
     */
    sortModule: Sort;
    private action;
    private dropIndex;
    private dropPosition;
    private modifiedRecords;
    private selectedRecords;
    private selectedRows;
    private loggerModule;
    private isSelfReference;
    private columnModel;
    private isExpandAll;
    private isCollapseAll;
    private isExpandRefresh;
    private gridSettings;
    private isEditCollapse;
    private treeColumnTextAlign;
    private treeColumnField;
    private stackedHeader;
    /** @hidden */
    initialRender: boolean;
    /** @hidden */
    flatData: Object[];
    /** @hidden */
    private infiniteScrollData;
    /** @hidden */
    private remoteCollapsedData;
    /** @hidden */
    private remoteExpandedData;
    /** @hidden */
    isLocalData: boolean;
    /** @hidden */
    parentData: Object[];
    /**
     * @hidden
     */
    renderModule: Render;
    /** @hidden */
    summaryModule: Aggregate;
    /**
     * The `reorderModule` is used to manipulate reordering in TreeGrid.
     */
    reorderModule: Reorder;
    /**
     * The `columnMenuModule` is used to manipulate column menu items and its action in TreeGrid.
     */
    columnMenuModule: ColumnMenu;
    /**
     * The `rowDragandDrop` is used to manipulate Row Reordering in TreeGrid.
     */
    rowDragAndDropModule: RowDD;
    /**
     * The `contextMenuModule` is used to handle context menu items and its action in the TreeGrid.
     */
    contextMenuModule: ContextMenu;
    /**
     * `detailRowModule` is used to handle detail rows rendering in the TreeGrid.
     *
     * @hidden
     */
    detailRowModule: DetailRow;
    /**
     * `freezeModule` is used to freeze the rows and columns in the TreeGrid.
     *
     * @hidden
     */
    freezeModule: Freeze;
    /**
     * Gets or sets the number of frozen rows.
     *
     * @default 0
     */
    frozenRows: number;
    /**
     * Gets or sets the number of frozen columns.
     *
     * @default 0
     */
    frozenColumns: number;
    /**
     *  Defines the mode of clip. The available modes are,
     * ```props
     * * Clip :- Truncates the cell content when it overflows its area.
     * * Ellipsis :- Displays ellipsis when the cell content overflows its area.
     * * EllipsisWithTooltip :- Displays ellipsis when the cell content overflows its area,
     * ```
     * also it will display the tooltip while hover on ellipsis is applied.
     *
     * @default Syncfusion.EJ2.Grids.ClipMode.Ellipsis
     * @aspType Syncfusion.EJ2.Grids.ClipMode
     * @isEnumeration true
     */
    clipMode: ClipMode;
    /**
     * `resizeModule` is used to manipulate resizing in the TreeGrid.
     *
     * @hidden
     */
    resizeModule: Resize;
    /**
     * The `keyboardModule` is used to manipulate keyboard interactions in TreeGrid.
     */
    keyboardModule: KeyboardEvents;
    /**
     * The `printModule` is used to handle the printing feature of the TreeGrid.
     */
    printModule: Print;
    /**
     * `clipboardModule` is used to handle TreeGrid copy action.
     */
    clipboardModule: TreeClipboard;
    private keyConfigs;
    /** @hidden */
    filterModule: Filter;
    excelExportModule: ExcelExport;
    pdfExportModule: PdfExport;
    selectionModule: TreeGridSelection;
    /** @hidden */
    /** @hidden */
    grid: Grid;
    /**
     * Defines the schema of dataSource.
     * If the `columns` declaration is empty or undefined then the `columns` are automatically generated from data source.
     * {% codeBlock src='treegrid/columns/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    columns: ColumnModel[] | string[] | Column[];
    /**
     * Specifies the mapping property path for child records in data source
     * {% codeBlock src='treegrid/childMapping/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    childMapping: string;
    /**
     * Specifies whether record is parent or not for the remote data binding
     *
     * @default null
     */
    hasChildMapping: string;
    /**
     * Specifies the index of the column that needs to have the expander button.
     *
     * @default 0
     */
    treeColumnIndex: number;
    /**
     * Specifies the name of the field in the dataSource, which contains the id of that row.
     * {% codeBlock src='treegrid/idMapping/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    idMapping: string;
    /**
     * Specifies the name of the field in the dataSource, which contains the parent’s id
     * {% codeBlock src='treegrid/parentIdMapping/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    parentIdMapping: string;
    /**
     * Specifies whether to load all the rows in collapsed state when the TreeGrid is rendered for the first time.
     *
     * @default false
     */
    enableCollapseAll: boolean;
    /**
     * Specifies the mapping property path for the expand status of a record in data source.
     *
     * @default null
     */
    expandStateMapping: string;
    /**
     * If `allowRowDragAndDrop` is set to true, you can drag and drop treegrid rows at another treegrid.
     *
     * @default false
     */
    allowRowDragAndDrop: boolean;
    /**
     * It is used to render TreeGrid table rows.
     * {% codeBlock src='treegrid/dataSource/index.md' %}{% endcodeBlock %}
     *
     * @default []
     * @isGenericType true
     * @isDataSource true
     */
    dataSource: Object | DataManager;
    /**
     * Defines the external [`Query`](https://ej2.syncfusion.com/documentation/data/api-query.html)
     * that will be executed along with data processing.
     *
     * @default null
     */
    query: Query;
    /**
     * @hidden
     */
    cloneQuery: Query;
    /**
     * Defines the print modes. The available print modes are
     * ```props
     * * AllPages :- Prints all pages of the TreeGrid.
     * * CurrentPage :- Prints the current page of the TreeGrid.
     * ```
     *
     * @default Syncfusion.EJ2.Grids.PrintMode.AllPages
     * @isEnumeration true
     * @aspType Syncfusion.EJ2.Grids.PrintMode
     */
    printMode: PrintMode;
    /**
     * If `allowPaging` is set to true, pager renders.
     *
     * @default false
     */
    allowPaging: boolean;
    /**
     * If `loadChildOnDemand` is enabled, parent records are render in expanded state.
     *
     * @default false
     */
    loadChildOnDemand: boolean;
    /**
     * If `allowTextWrap` set to true,
     * then text content will wrap to the next line when its text content exceeds the width of the Column Cells.
     *
     * @default false
     */
    allowTextWrap: boolean;
    /**
     * Configures the text wrap in the TreeGrid.
     *
     * @default {wrapMode:"Both"}
     */
    textWrapSettings: TextWrapSettingsModel;
    /**
     * If `allowReordering` is set to true, TreeGrid columns can be reordered.
     * Reordering can be done by drag and drop of a particular column from one index to another index.
     * > If TreeGrid is rendered with stacked headers, reordering is allowed only at the same level as the column headers.
     *
     * @default false
     */
    allowReordering: boolean;
    /**
     * If `allowResizing` is set to true, TreeGrid columns can be resized.
     *
     * @default false
     */
    allowResizing: boolean;
    /**
     * If `autoCheckHierarchy` is set to true, hierarchy checkbox selection is enabled in TreeGrid.
     *
     * @default false
     */
    autoCheckHierarchy: boolean;
    /**
     * Configures the pager in the TreeGrid.
     *
     * @default {currentPage: 1, pageSize: 12, pageCount: 8, enableQueryString: false, pageSizes: false, template: null}
     */
    pageSettings: PageSettingsModel;
    /**
     * Configures the row drop settings of the TreeGrid.
     */
    rowDropSettings: RowDropSettingsModel;
    /**
     * @hidden
     * It used to render pager template
     * @default null
     * @aspType string
     */
    pagerTemplate: string | Function;
    /**
     * If `showColumnMenu` set to true, then it will enable the column menu options in each columns.
     *
     * > Check the [`Column menu`](../../treegrid/columns/#column-menu/) for its configuration.
     *
     * @default false
     */
    showColumnMenu: boolean;
    /**
     * If `showColumnChooser` is set to true, it allows you to dynamically show or hide columns.
     *
     * @default false
     */
    showColumnChooser: boolean;
    /**
     * If `allowSorting` is set to true, it allows sorting of treegrid records when column header is clicked.
     *
     * @default false
     */
    allowSorting: boolean;
    /**
     * If `allowMultiSorting` set to true, then it will allow the user to sort multiple column in the treegrid.
     * > `allowSorting` should be true.
     *
     * @default true
     */
    allowMultiSorting: boolean;
    /**
     * Configures the sort settings of the TreeGrid.
     *
     * @default {columns:[]}
     */
    sortSettings: SortSettingsModel;
    /**
     * Configures the TreeGrid aggregate rows.
     * > Check the [`Aggregates`](../../treegrid/aggregates/aggregates) for its configuration.
     *
     * @default []
     */
    aggregates: AggregateRowModel[];
    /**
     * Configures the edit settings.
     *
     * @default { allowAdding: false, allowEditing: false, allowDeleting: false, mode:'Normal',
     * allowEditOnDblClick: true, showConfirmDialog: true, showDeleteConfirmDialog: false }
     */
    editSettings: EditSettingsModel;
    /**
     * If `allowFiltering` is set to true the filter bar will be displayed.
     * If set to false the filter bar will not be displayed.
     * Filter bar allows the user to filter tree grid records with required criteria.
     *
     * @default false
     */
    allowFiltering: boolean;
    /**
     * The detail template allows you to show or hide additional information about a particular row.
     *
     * > It accepts either the [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
     * or the HTML element ID.
     *
     * @aspType string
     */
    detailTemplate: string | Function;
    /**
     * Configures the filter settings of the TreeGrid.
     *
     * @default {columns: [], type: 'FilterBar', mode: 'Immediate', showFilterBarStatus: true, immediateModeDelay: 1500 , operators: {}}
     */
    filterSettings: FilterSettingsModel;
    /**
     * Configures the search settings of the TreeGrid.
     *
     * @default {search: [] , operators: {}}
     */
    searchSettings: SearchSettingsModel;
    /**
     * `toolbar` defines the ToolBar items of the TreeGrid.
     * It contains built-in and custom toolbar items.
     * If a string value is assigned to the `toolbar` option, it is considered as the template for the whole TreeGrid ToolBar.
     * If an array value is assigned, it is considered as the list of built-in and custom toolbar items in the TreeGrid's Toolbar.
     * <br><br>
     * The available built-in ToolBar items are:
     * * Search: Searches records by the given key.
     * * ExpandAll: Expands all the rows in TreeGrid
     * * CollapseAll: Collapses all the rows in TreeGrid
     * * ExcelExport - Export the TreeGrid to Excel(excelExport() method manually to make export.)
     * * PdfExport - Export the TreeGrid to PDF(pdfExport() method manually to make export.)
     * * CsvExport - Export the TreeGrid to CSV(csvExport() method manually to make export.)<br><br>
     * The following code example implements the custom toolbar items.
     *
     * @default null
     */
    toolbar: (ToolbarItems | string | ItemModel | ToolbarItem)[];
    /**
     * @hidden
     * It used to render toolbar template
     * @default null
     * @aspType string
     */
    toolbarTemplate: string | Function;
    /**
     * Defines the mode of TreeGrid lines. The available modes are,
     * ```props
     * * Both :- Displays both horizontal and vertical TreeGrid lines.
     * * None :- No TreeGrid lines are displayed.
     * * Horizontal :- Displays the horizontal TreeGrid lines only.
     * * Vertical :- Displays the vertical TreeGrid lines only.
     * * Default :- Displays TreeGrid lines based on the theme.
     * ```
     *
     * @default Syncfusion.EJ2.Grids.GridLine.Default
     * @isEnumeration true
     * @aspType Syncfusion.EJ2.Grids.GridLine
     */
    gridLines: GridLine;
    /**
     * `contextMenuItems` defines both built-in and custom context menu items.
     * <br><br>
     * The available built-in items are,
     * * `AutoFitAll` - Auto fit the size of all columns.
     * * `AutoFit` - Auto fit the current column.
     * * `Edit` - Edit the current record.
     * * `Delete` - Delete the current record.
     * * `Save` - Save the edited record.
     * * `Cancel` - Cancel the edited state.
     * * `PdfExport` - Export the grid as Pdf format.
     * * `ExcelExport` - Export the grid as Excel format.
     * * `CsvExport` - Export the grid as CSV format.
     * * `SortAscending` - Sort the current column in ascending order.
     * * `SortDescending` - Sort the current column in descending order.
     * * `FirstPage` - Go to the first page.
     * * `PrevPage` - Go to the previous page.
     * * `LastPage` - Go to the last page.
     * * `NextPage` - Go to the next page.
     *
     * @default null
     */
    contextMenuItems: ContextMenuItem[] | ContextMenuItemModel[];
    /**
     * `columnMenuItems` defines both built-in and custom column menu items.
     * <br><br>
     * The available built-in items are,
     * * `AutoFitAll` - Auto fit the size of all columns.
     * * `AutoFit` - Auto fit the current column.
     * * `SortAscending` - Sort the current column in ascending order.
     * * `SortDescending` - Sort the current column in descending order.
     * * `Filter` - Filter options will show based on filterSettings property like filterbar, menu filter.
     *
     * @default null
     */
    columnMenuItems: ColumnMenuItem[] | ColumnMenuItemModel[];
    /**
     * The row template that renders customized rows from the given template.
     * By default, TreeGrid renders a table row for every data source item.
     * > * It accepts either [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
     * or HTML element ID.
     * > * The row template must be a table row.
     *
     * > Check the [`Row Template`](../../treegrid/row) customization.
     *
     * @aspType string
     */
    rowTemplate: string | Function;
    /**
     * `copyHierarchyMode` Defines the copy clipboard types.
     * <br><br>
     * The available built-in items are,
     * * `Parent` - Copy the selected data with parent record.
     * * `Child` - Copy the selected data with child record.
     * * `Both` - Copy the selected data with both parent and child record.
     * * `None` - Copy only the selected record.
     *
     * @default Parent
     */
    copyHierarchyMode: CopyHierarchyType;
    /**
     * Defines the height of TreeGrid rows.
     *
     * @default null
     */
    rowHeight: number;
    /**
     * If `enableAltRow` is set to true, the TreeGrid will render with `e-altrow` CSS class to the alternative tr elements.
     * > Check the [`AltRow`](../../treegrid/row/#styling-alternate-rows/) to customize the styles of alternative rows.
     *
     * @default true
     */
    enableAltRow: boolean;
    /**
     * Enables or disables the key board interaction of TreeGrid.
     *
     * @hidden
     * @default true
     */
    allowKeyboard: boolean;
    /**
     * If `enableHover` is set to true, the row hover is enabled in the TreeGrid.
     *
     * @default false
     */
    enableHover: boolean;
    /**
     * If `enableAutoFill` is set to true, then the auto fill icon will displayed on cell selection for copy cells.
     * It requires the selection `mode` to be Cell and `cellSelectionMode` to be `Box`.
     *
     * @default false
     */
    enableAutoFill: boolean;
    /**
     * If `enableAdaptiveUI` is set to true, the pop-up UI will become adaptive to small screens,
     * and be used for filtering and other features.
     * ```html
     * <div id='treegrid'></div>
     * <script>
     *  var treegridObj = new TreeGrid({ enableAdaptiveUI: true });
     *  treegridObj.appendTo('#treegrid');
     * </script>
     * ```
     *
     * @default false
     */
    enableAdaptiveUI: boolean;
    /**
     * If `enableImmutableMode`  is set to true, the TreeGrid will reuse old rows if it exists in the new result instead of
     * full refresh while performing the TreeGrid actions.
     *
     * @default false
     */
    enableImmutableMode: boolean;
    /**
     * Defines the scrollable height of the TreeGrid content.
     *
     * @default 'auto'
     */
    height: string | number;
    /**
     * Defines the TreeGrid width.
     *
     * @default 'auto'
     */
    width: string | number;
    /**
     *  Configures the loading indicator of the Tree Grid. Specifies whether to display spinner or shimmer effect
     *  during the waiting time on any actions (paging, sorting, filtering, CRUD operations) performed in Tree Grid.
     *
     * @default {indicatorType: 'Spinner'}
     */
    loadingIndicator: LoadingIndicatorModel;
    /**
     * Specifies whether to display shimmer effect during scrolling action in virtual scrolling feature.
     * If disabled, spinner is shown instead of shimmer effect.
     *
     * @default true
     */
    enableVirtualMaskRow: boolean;
    /**
     * If `enableVirtualization` set to true, then the TreeGrid will render only the rows visible within the view-port
     * and load subsequent rows on vertical scrolling. This helps to load large dataset in TreeGrid.
     *
     * @default false
     */
    enableVirtualization: boolean;
    /**
     * If `enableColumnVirtualization` set to true, then the Tree Grid will render only the columns visible within the view-port
     * and load subsequent columns on horizontal scrolling. This helps to load large dataset of columns in Tree Grid.
     *
     * @default false
     */
    enableColumnVirtualization: boolean;
    /**
     * Specifies whether to display or remove the untrusted HTML values in the TreeGrid component.
     * If `enableHtmlSanitizer` set to true, then it will sanitize any suspected untrusted strings and scripts before rendering them.
     *
     * @default false
     */
    enableHtmlSanitizer: boolean;
    /**
     * If `enableInfiniteScrolling` set to true, then the data will be loaded in TreeGrid when the scrollbar reaches the end.
     * This helps to load large dataset in TreeGrid.
     *
     * @default false

     */
    enableInfiniteScrolling: boolean;
    /**
     * Configures the infinite scroll settings.
     *
     * @default { enableCache: false, maxBlocks: 5, initialBlocks: 5 }

     */
    infiniteScrollSettings: InfiniteScrollSettingsModel;
    /**
     * `columnQueryMode`provides options to retrieves data from the data source.Their types are
     * * `All`: It retrieves whole data source.
     * * `Schema`: retrieves data for all the defined columns in TreeGrid from the data source.
     * * `ExcludeHidden`: retrieves data only for visible columns of TreeGrid from the data Source.
     *
     * @default All
     */
    columnQueryMode: ColumnQueryModeType;
    /**
     * Triggers when the component is created.
     *
     * @event created
     */
    created: EmitType<Object>;
    /**
     * This event allows customization of TreeGrid properties before rendering.
     *
     * @event load
     */
    load: EmitType<Object>;
    /**
     * Triggers while expanding the TreeGrid record
     *
     * @event expanding
     */
    expanding: EmitType<RowExpandingEventArgs>;
    /**
     * Triggers after the record is expanded
     *
     * @event expanded
     */
    expanded: EmitType<RowExpandedEventArgs>;
    /**
     * Triggers while collapsing the TreeGrid record
     *
     * @event collapsing
     */
    collapsing: EmitType<RowCollapsingEventArgs>;
    /**
     * Triggers after the record is collapsed.
     *
     * @event collapsed
     */
    collapsed: EmitType<RowCollapsedEventArgs>;
    /**
     * Triggers when cell is saved.
     *
     * @event cellSave
     */
    cellSave: EmitType<CellSaveArgs>;
    /**
     * Triggers when cell is saved.
     *
     * @event cellSaved
     */
    cellSaved: EmitType<CellSaveArgs>;
    /**
     * Triggers when TreeGrid actions such as sorting, filtering, paging etc., starts.
     * @event actionBegin
     */
    actionBegin: EmitType<PageEventArgs | FilterEventArgs | SortEventArgs | SearchEventArgs | AddEventArgs | SaveEventArgs | EditEventArgs | DeleteEventArgs>;
    /**
     * Triggers when TreeGrid actions such as sorting, filtering, paging etc. are completed.
     * @event actionComplete
     */
    actionComplete: EmitType<PageEventArgs | FilterEventArgs | SortEventArgs | SearchEventArgs | AddEventArgs | SaveEventArgs | EditEventArgs | DeleteEventArgs>;
    /**
     * Triggers before the record is to be edit.
     * @event beginEdit
     */
    beginEdit: EmitType<BeginEditArgs>;
    /**
     * Triggers when records are added in batch mode.
     * @event batchAdd
     */
    batchAdd: EmitType<BatchAddArgs>;
    /**
     * Triggers when records are deleted in batch mode.
     * @event batchDelete
     */
    batchDelete: EmitType<BatchDeleteArgs>;
    /**
     * Triggers before records are added in batch mode.
     * @event batchCancel
     */
    batchCancel: EmitType<BatchCancelArgs>;
    /**
     * Triggers before records are added in batch mode.
     * @event beforeBatchAdd
     */
    beforeBatchAdd: EmitType<BeforeBatchAddArgs>;
    /**
     * Triggers before records are deleted in batch mode.
     * @event beforeBatchDelete
     */
    beforeBatchDelete: EmitType<BeforeBatchDeleteArgs>;
    /**
     * Triggers before records are saved in batch mode.
     * @event beforeBatchSave
     */
    beforeBatchSave: EmitType<BeforeBatchSaveArgs>;
    /**
     * Triggers when the cell is being edited.
     * @event cellEdit
     */
    cellEdit: EmitType<CellEditArgs>;
    /**
     * Triggers when any TreeGrid action failed to achieve the desired results.
     *
     * @event actionFailure
     */
    actionFailure: EmitType<FailureEventArgs>;
    /**
     * Triggers when data source is populated in the TreeGrid.
     *
     * @event dataBound
     */
    dataBound: EmitType<Object>;
    /**
     * Triggers when the TreeGrid data is added, deleted and updated.
     * Invoke the done method from the argument to start render after edit operation.
     *
     * @event dataSourceChanged

     */
    dataSourceChanged: EmitType<DataSourceChangedEventArgs>;
    /**
     * Triggers when the TreeGrid actions such as Sorting, Paging etc., are done.
     * In this event,the current view data and total record count should be assigned to the `dataSource` based on the action performed.
     *
     * @event dataStateChange

     */
    dataStateChange: EmitType<DataStateChangeEventArgs>;
    /**
     * Triggers when record is double clicked.
     *
     * @event recordDoubleClick
     */
    recordDoubleClick: EmitType<RecordDoubleClickEventArgs>;
    /**
     * Triggered every time a request is made to access row information, element, or data.
     * This will be triggered before the row element is appended to the TreeGrid element.
     *
     * @event rowDataBound
     */
    rowDataBound: EmitType<RowDataBoundEventArgs>;
    /**
     * Triggers after detail row expands.
     * > This event triggers at initial expand.
     *
     * @event detailDataBound
     */
    detailDataBound: EmitType<DetailDataBoundEventArgs>;
    /**
     * Triggered every time a request is made to access cell information, element, or data.
     * This will be triggered before the cell element is appended to the TreeGrid element.
     *
     * @event queryCellInfo
     */
    queryCellInfo: EmitType<QueryCellInfoEventArgs>;
    /**
     * If `allowSelection` is set to true, it allows selection of (highlight row) TreeGrid records by clicking it.
     *
     * @default true
     */
    allowSelection: boolean;
    /**
     * Triggers before row selection occurs.
     *
     * @event rowSelecting
     */
    rowSelecting: EmitType<RowSelectingEventArgs>;
    /**
     * Triggers after a row is selected.
     *
     * @event rowSelected
     */
    rowSelected: EmitType<RowSelectEventArgs>;
    /**
     * Triggers before deselecting the selected row.
     *
     * @event rowSelected

     */
    rowDeselecting: EmitType<RowDeselectEventArgs>;
    /**
     * Triggers when a selected row is deselected.
     *
     * @event rowDeselected
     */
    rowDeselected: EmitType<RowDeselectEventArgs>;
    /**
     * Triggered for stacked header.
     *
     * @event headerCellInfo
     */
    headerCellInfo: EmitType<HeaderCellInfoEventArgs>;
    /**
     * Triggers before any cell selection occurs.
     *
     * @event cellSelecting
     */
    cellSelecting: EmitType<CellSelectingEventArgs>;
    /**
     * Triggers before column menu opens.
     *
     * @event columnMenuOpen

     */
    columnMenuOpen: EmitType<ColumnMenuOpenEventArgs>;
    /**
     * Triggers when click on column menu.
     *
     * @event columnMenuClick
     */
    columnMenuClick: EmitType<MenuEventArgs>;
    /**
     * Triggers after a cell is selected.
     *
     * @event cellSelected
     */
    cellSelected: EmitType<CellSelectEventArgs>;
    /**
     * Triggers before the selected cell is deselecting.
     *
     * @event cellDeselecting

     */
    cellDeselecting: EmitType<CellDeselectEventArgs>;
    /**
     * Triggers when a particular selected cell is deselected.
     *
     * @event cellDeselected

     */
    cellDeselected: EmitType<CellDeselectEventArgs>;
    /**
     * Triggers when column resize starts.
     *
     * @event resizeStart

     */
    resizeStart: EmitType<ResizeArgs>;
    /**
     * Triggers on column resizing.
     *
     * @event resizing

     */
    resizing: EmitType<ResizeArgs>;
    /**
     * Triggers when column resize ends.
     *
     * @event resizeStop

     */
    resizeStop: EmitType<ResizeArgs>;
    /**
     * Triggers when column header element drag (move) starts.
     *
     * @event columnDragStart

     */
    columnDragStart: EmitType<ColumnDragEventArgs>;
    /**
     * Triggers when column header element is dragged (moved) continuously.
     *
     * @event columnDrag

     */
    columnDrag: EmitType<ColumnDragEventArgs>;
    /**
     * Triggers when a column header element is dropped on the target column.
     *
     * @event columnDrop

     */
    columnDrop: EmitType<ColumnDragEventArgs>;
    /**
     * Triggers when the check box state change in checkbox column.
     *
     * @event checkboxChange

     */
    checkboxChange: EmitType<CheckBoxChangeEventArgs>;
    /**
     * Triggers after print action is completed.
     *
     * @event printComplete

     */
    printComplete: EmitType<PrintEventArgs>;
    /**
     * Triggers before the print action starts.
     *
     * @event beforePrint

     */
    beforePrint: EmitType<PrintEventArgs>;
    /**
     * Triggers when toolbar item is clicked.
     *
     * @event toolbarClick
     */
    toolbarClick: EmitType<ClickEventArgs>;
    /**
     * Triggers before data is bound to Tree Grid.
     *
     * @event beforeDataBound
     */
    beforeDataBound: EmitType<BeforeDataBoundArgs>;
    /**
     * Triggers before context menu opens.
     *
     * @event contextMenuOpen

     */
    contextMenuOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers when click on context menu.
     *
     * @event contextMenuClick
     */
    contextMenuClick: EmitType<MenuEventArgs>;
    /**
     * Triggers before TreeGrid copy action.
     *
     * @event beforeCopy

     */
    beforeCopy: EmitType<BeforeCopyEventArgs>;
    /**
     * Triggers before TreeGrid paste action.
     *
     * @event beforePaste

     */
    beforePaste: EmitType<BeforePasteEventArgs>;
    /**
     * Triggers when row elements are dragged (moved) continuously.
     *
     * @event rowDrag

     */
    rowDrag: EmitType<RowDragEventArgs>;
    /**
     * Triggers when row element’s drag(move) starts.
     *
     * @event rowDragStart

     */
    rowDragStart: EmitType<RowDragEventArgs>;
    /**
     * Triggers when row element’s before drag(move).
     *
     * @event rowDragStartHelper

     */
    rowDragStartHelper: EmitType<RowDragEventArgs>;
    /**
     * Triggers when row elements are dropped on the target row.
     *
     * @event rowDrop

     */
    rowDrop: EmitType<RowDragEventArgs>;
    /**
     * The `selectedRowIndex` allows you to select a row at initial rendering.
     * You can also get the currently selected row index.
     *
     * @default -1
     */
    selectedRowIndex: number;
    /**
     * Configures the selection settings.
     *
     * @default {mode: 'Row', cellSelectionMode: 'Flow', type: 'Single'}
     */
    selectionSettings: SelectionSettingsModel;
    /**
     * If `allowExcelExport` set to true, then it will allow the user to export treegrid to Excel file.
     *
     * > Check the [`ExcelExport`](../../treegrid/excel-export/) to configure exporting document.
     *
     * @default false
     */
    allowExcelExport: boolean;
    /**
     * If `allowPdfExport` set to true, then it will allow the user to export treegrid to Pdf file.
     *
     * > Check the [`Pdfexport`](../../treegrid/pdf-export/) to configure the exporting document.
     *
     * @default false
     */
    allowPdfExport: boolean;
    /**
     * Triggers before exporting each cell to PDF document.
     * You can also customize the PDF cells.
     *
     * @event pdfQueryCellInfo

     */
    pdfQueryCellInfo: EmitType<PdfQueryCellInfoEventArgs>;
    /**
     * Triggers before exporting each header cell to PDF document.
     * You can also customize the PDF cells.
     *
     * @event pdfHeaderQueryCellInfo

     */
    pdfHeaderQueryCellInfo: EmitType<PdfHeaderQueryCellInfoEventArgs>;
    /**
     * Triggers before exporting each cell to Excel file.
     * You can also customize the Excel cells.
     *
     * @event excelQueryCellInfo

     */
    excelQueryCellInfo: EmitType<ExcelQueryCellInfoEventArgs>;
    /**
     * Triggers before exporting each header cell to Excel file.
     * You can also customize the Excel cells.
     *
     * @event excelHeaderQueryCellInfo

     */
    excelHeaderQueryCellInfo: EmitType<ExcelHeaderQueryCellInfoEventArgs>;
    /**
     * Triggers before TreeGrid data is exported to Excel file.
     *
     * @event beforeExcelExport
     */
    beforeExcelExport: EmitType<Object>;
    /**
     * Triggers after TreeGrid data is exported to Excel file.
     *
     * @event excelExportComplete

     */
    excelExportComplete: EmitType<ExcelExportCompleteArgs>;
    /**
     * Triggers before TreeGrid data is exported to PDF document.
     *
     * @event beforePdfExport
     */
    beforePdfExport: EmitType<Object>;
    /**
     * Triggers after TreeGrid data is exported to PDF document.
     *
     * @event pdfExportComplete

     */
    pdfExportComplete: EmitType<PdfExportCompleteArgs>;
    /**
     * Export TreeGrid data to Excel file(.xlsx).
     *
     * @param  {ExcelExportProperties | TreeGridExcelExportProperties} excelExportProperties - Defines the export properties of the Tree Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<any>} - Returns promise object of export action
     */
    excelExport(excelExportProperties?: ExcelExportProperties | TreeGridExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): Promise<any>;
    /**
     * Export TreeGrid data to CSV file.
     *
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the TreeGrid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<any>} - Returns promise object of export action
     */
    csvExport(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): Promise<any>;
    /**
     * Export TreeGrid data to PDF document.
     *
     * @param {PdfExportProperties | TreeGridPdfExportProperties} pdfExportProperties - Defines the export properties of the Tree Grid.
     * @param {boolean} isMultipleExport - Define to enable multiple export.
     * @param {Object} pdfDoc - Defined the Pdf Document if multiple export is enabled.
     * @param {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<any>} - Returns promise object of export action
     */
    pdfExport(pdfExportProperties?: PdfExportProperties | TreeGridPdfExportProperties, isMultipleExport?: boolean, pdfDoc?: Object, isBlob?: boolean): Promise<Object>;
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns TreeGrid module name
     */
    protected getModuleName(): string;
    /**
     * For internal use only - Initialize the event handler;
     *
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * Sorts a column with the given options.
     *
     * @param {string} columnName - Defines the column name to be sorted.
     * @param {SortDirection} direction - Defines the direction of sorting field.
     * @param {boolean} isMultiSort - Specifies whether the previous sorted columns are to be maintained.
     * @returns {void}
     */
    sortByColumn(columnName: string, direction: SortDirection, isMultiSort?: boolean): void;
    /**
     * Clears all the sorted columns of the TreeGrid.
     *
     * @returns {void}
     */
    clearSorting(): void;
    /**
     * Remove sorted column by field name.
     *
     * @param {string} field - Defines the column field name to remove sort.
     * @returns {void}
     * @hidden
     */
    removeSortColumn(field: string): void;
    /**
     * Searches TreeGrid records using the given key.
     * You can customize the default search option by using the
     * [`searchSettings`](./#searchsettings/).
     *
     * @param  {string} searchString - Defines the key.
     * @returns {void}
     */
    search(searchString: string): void;
    /**
     * Changes the column width to automatically fit its content to ensure that the width shows the content without wrapping/hiding.
     * > * This method ignores the hidden columns.
     * > * Uses the `autoFitColumns` method in the `dataBound` event to resize at initial rendering.
     *
     * @param  {string |string[]} fieldNames - Defines the column names.
     * @returns {void}
     *
     *
     *
     */
    autoFitColumns(fieldNames?: string | string[]): void;
    /**
     * Changes the TreeGrid column positions by field names.
     *
     * @param  {string} fromFName - Defines the origin field name.
     * @param  {string} toFName - Defines the destination field name.
     * @returns {void}
     */
    reorderColumns(fromFName: string | string[], toFName: string): void;
    private TreeGridLocale;
    /**
     * By default, prints all the pages of the TreeGrid and hides the pager.
     * > You can customize print options using the
     * [`printMode`](./#printmode).
     *
     * @returns {void}
     */
    print(): void;
    private treeGridkeyActionHandler;
    private findnextRowElement;
    private findPreviousRowElement;
    private initProperties;
    /**
     * Binding events to the element while component creation.
     *
     * @hidden
     * @returns {void}
     */
    wireEvents(): void;
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} - Returns TreeGrid modules collection
     * @hidden
     */
    requiredModules(): ModuleDeclaration[];
    extendRequiredModules(modules: ModuleDeclaration[]): void;
    private isCommandColumn;
    /**
     * Unbinding events from the element while component destroy.
     *
     * @hidden
     * @returns {void}
     */
    unwireEvents(): void;
    /**
     * Logs tree grid error message on console
     *
     * @param {string | string[]} types - Tree Grid error type
     * @param {object} args - Error details
     * @hidden
     * @private
     * @returns {void}
     */
    log(types: string | string[], args?: Object): void;
    /**
     * For internal use only - To Initialize the component rendering.
     *
     * @private
     * @returns {void}
     */
    protected render(): void;
    private refreshToolbarItems;
    private afterGridRender;
    private convertTreeData;
    private bindGridProperties;
    private triggerEvents;
    private IsExpandCollapseClicked;
    private bindGridEvents;
    private lastRowBorder;
    private isPixelHeight;
    private extendedGridDataBoundEvent;
    private objectEqualityChecker;
    private bindCallBackEvents;
    private extendedGridEditEvents;
    private updateRowTemplate;
    private bindedDataSource;
    private extendedGridActionEvents;
    private extendedGridEvents;
    private bindGridDragEvents;
    /**
     * Renders TreeGrid component
     *
     * @private
     * @returns {void}
     */
    protected loadGrid(): void;
    /**
     * AutoGenerate TreeGrid columns from first record
     *
     * @hidden
     * @returns {void}
     */
    private autoGenerateColumns;
    private getGridEditSettings;
    /**
     * Defines grid toolbar from treegrid toolbar model
     *
     * @hidden
     * @returns {Object[]} - returns context menu items
     */
    private getContextMenu;
    /**
     * Defines grid toolbar from treegrid toolbar model
     *
     * @hidden
     * @returns {Object[]} - Returns toolbar items
     */
    private getGridToolbar;
    private getGridColumns;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {TreeGridModel} newProp - properties details which has to be modified
     * @hidden
     * @returns {void}
     */
    onPropertyChanged(newProp: TreeGridModel): void;
    private updateTreeColumnTextAlign;
    /**
     * Destroys the component (detaches/removes all event handlers, attributes, classes, and empties the component element).
     *
     * @method destroy
     * @returns {void}
     */
    destroy(): void;
    /**
     * Update the TreeGrid model
     *
     * @method dataBind
     * @returns {void}
     * @private
     */
    dataBind(): void;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns persist properties details
     * @hidden
     */
    getPersistData(): string;
    private ignoreInArrays;
    private ignoreInColumn;
    private mouseClickHandler;
    /**
     * Returns TreeGrid rows
     *
     * @returns {HTMLTableRowElement[]} - Returns row elements collection
     */
    getRows(): HTMLTableRowElement[];
    /**
     * Gets the pager of the TreeGrid.
     *
     * @returns {Element} - Returns pager element
     */
    getPager(): Element;
    /**
     * Adds a new record to the TreeGrid. Without passing parameters, it adds empty rows.
     * > `editSettings.allowEditing` should be true.
     *
     * @param {Object} data - Defines the new add record data.
     * @param {number} index - Defines the row index to be added.
     * @param {RowPosition} position - Defines the new row position to be added.
     * @returns {void}
     */
    addRecord(data?: Object, index?: number, position?: RowPosition): void;
    /**
     * Cancels edited state.
     *
     * @returns {void}
     */
    closeEdit(): void;
    /**
     * Saves the cell that is currently edited. It does not save the value to the DataSource.
     *
     * @returns {void}
     */
    saveCell(): void;
    /**
     * To update the specified cell by given value without changing into edited state.
     *
     * @param {number} rowIndex Defines the row index.
     * @param {string} field Defines the column field.
     * @param {string | number | boolean | Date} value - Defines the value to be changed.
     * @returns {void}
     */
    updateCell(rowIndex: number, field: string, value: string | number | boolean | Date): void;
    /**
     * To update the specified row by given values without changing into edited state.
     *
     * @param {number} index Defines the row index.
     * @param {Object} data Defines the data object to be updated.
     * @returns {void}
     */
    updateRow(index: number, data: Object): void;
    /**
     * Delete a record with Given options. If fieldName and data is not given then TreeGrid will delete the selected record.
     * > `editSettings.allowDeleting` should be true.
     *
     * @param {string} fieldName - Defines the primary key field, 'Name of the column'.
     * @param {Object} data - Defines the JSON data of the record to be deleted.
     * @returns {void}
     */
    deleteRecord(fieldName?: string, data?: Object): void;
    /**
     * To edit any particular row by TR element.
     *
     * @param {HTMLTableRowElement} row - Defines the table row to be edited.
     * @returns {void}
     */
    startEdit(row?: HTMLTableRowElement): void;
    /**
     * To edit any particular cell using row index and cell index.
     *
     * @param {number} rowIndex - Defines row index to edit a particular cell.
     * @param {string} field - Defines the field name of the column to perform cell edit.
     * @returns {void}
     */
    editCell(rowIndex?: number, field?: string): void;
    /**
     * Enables or disables ToolBar items.
     *
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @returns {void}
     */
    enableToolbarItems(items: string[], isEnable: boolean): void;
    /**
     * If TreeGrid is in editable state, you can save a record by invoking endEdit.
     *
     * @returns {void}
     */
    endEdit(): void;
    /**
     * Column chooser can be displayed on screen by given position(X and Y axis).
     *
     * @param {number} x - Defines the X axis.
     * @param {number} y - Defines the Y axis.
     * @returns {void}
     */
    openColumnChooser(x?: number, y?: number): void;
    /**
     * Delete any visible row by TR element.
     *
     * @param {HTMLTableRowElement} tr - Defines the table row element.
     * @returns {void}
     */
    deleteRow(tr: HTMLTableRowElement): void;
    /**
     * Get the names of the primary key columns of the TreeGrid.
     *
     * @returns {string[]} - Returns primary key collection
     */
    getPrimaryKeyFieldNames(): string[];
    /**
     * Updates particular cell value based on the given primary key value.
     * > Primary key column must be specified using `columns.isPrimaryKey` property.
     *
     * @param {string| number} key - Specifies the PrimaryKey value of dataSource.
     * @param {string } field - Specifies the field name which you want to update.
     * @param {string | number | boolean | Date} value - To update new value for the particular cell.
     * @returns {void}
     */
    setCellValue(key: string | number, field: string, value: string | number | boolean | Date): void;
    /**
     * Updates and refresh the particular row values based on the given primary key value.
     * > Primary key column must be specified using `columns.isPrimaryKey` property.
     *
     *  @param {string| number} key - Specifies the PrimaryKey value of dataSource.
     *  @param {Object} rowData - To update new data for the particular row.
     * @returns {void}
     */
    setRowData(key: string | number, rowData?: ITreeData): void;
    /**
     * Navigates to the specified target page.
     *
     * @param  {number} pageNo - Defines the page number to navigate.
     * @returns {void}
     */
    goToPage(pageNo: number): void;
    /**
     * Defines the text of external message.
     *
     * @param  {string} message - Defines the message to update.
     * @returns {void}
     */
    updateExternalMessage(message: string): void;
    /**
     * Gets a cell by row and column index.
     *
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @returns {Element} - Returns cell element in grid content
     */
    getCellFromIndex(rowIndex: number, columnIndex: number): Element;
    /**
     * Gets a Column by column name.
     *
     * @param  {string} field - Specifies the column name.
     * @returns {Column} - Returns tree grid column
     */
    getColumnByField(field: string): Column;
    /**
     * Gets a column by UID.
     *
     * @param  {string} uid - Specifies the column UID.
     * @returns {Column} - Returns tree grid column
     */
    getColumnByUid(uid: string): Column;
    /**
     * Gets the collection of column fields.
     *
     * @returns {string[]} - Returns column field name as collection
     */
    getColumnFieldNames(): string[];
    /**
     * Gets the footer div of the TreeGrid.
     *
     * @returns {Element} - Returns footer content div element
     */
    getFooterContent(): Element;
    /**
     * Gets the footer table element of the TreeGrid.
     *
     * @returns {Element} - Returns footer content table element
     */
    getFooterContentTable(): Element;
    /**
     * Shows a column by its column name.
     *
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} showBy - Defines the column key either as field name or header text.
     * @returns {void}
     */
    showColumns(keys: string | string[], showBy?: string): void;
    /**
     * Hides a column by column name.
     *
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} hideBy - Defines the column key either as field name or header text.
     * @returns {void}
     */
    hideColumns(keys: string | string[], hideBy?: string): void;
    /**
     * Gets a column header by column name.
     *
     * @param  {string} field - Specifies the column name.
     * @returns {Element} - Returns column header element
     */
    getColumnHeaderByField(field: string): Element;
    /**
     * Gets a column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} - Returns column header element
     */
    getColumnHeaderByIndex(index: number): Element;
    /**
     * Gets a column header by UID.
     *
     * @param {string} uid - Specifies the column uid.
     * @returns {Element} - Returns column header element
     */
    getColumnHeaderByUid(uid: string): Element;
    /**
     * Gets a column index by column name.
     *
     * @param  {string} field - Specifies the column name.
     * @returns {number} - Returns column index
     */
    getColumnIndexByField(field: string): number;
    private getVirtualColIndexByUid;
    /**
     * Gets a column index by UID.
     *
     * @param  {string} uid - Specifies the column UID.
     * @returns {number} - Returns column index
     */
    getColumnIndexByUid(uid: string): number;
    /**
     * Gets the columns from the TreeGrid.
     *
     * @param {boolean} isRefresh - Defined whether to update DOM
     * @returns {Column[]} - Returns treegrid columns collection
     */
    getColumns(isRefresh?: boolean): Column[];
    private updateColumnModel;
    private updateColumnsWidth;
    /**
     * Gets the content div of the TreeGrid.
     *
     * @returns {Element} - Return tree grid content element
     */
    getContent(): Element;
    private mergePersistTreeGridData;
    private mergeColumns;
    private updateTreeGridModel;
    /**
     * Gets the content table of the TreeGrid.
     *
     * @returns {Element} - Returns content table element
     */
    getContentTable(): Element;
    /**
     * Gets all the TreeGrid's data rows.
     *
     * @returns {Element[]} - Returns row elements
     */
    getDataRows(): Element[];
    /**
     * Get current visible data of TreeGrid.
     *
     * @returns {Object[]} - Returns current view records
     * @isGenericType true
     */
    getCurrentViewRecords(): Object[];
    /**
     * Gets the added, edited,and deleted data before bulk save to the DataSource in batch mode.
     *
     * @returns {Object} - Returns batch changes
     */
    getBatchChanges(): Object;
    /**
     * Gets the header div of the TreeGrid.
     *
     * @returns {Element} - Returns Header content element
     */
    getHeaderContent(): Element;
    /**
     * Gets the header table element of the TreeGrid.
     *
     * @returns {Element} - Return header table element
     */
    getHeaderTable(): Element;
    /**
     * Gets a row by index.
     *
     * @param  {number} index - Specifies the row index.
     * @returns {Element} - Returns row element
     */
    getRowByIndex(index: number): Element;
    /**
     * Get a row information based on cell
     *
     * @param {Element | EventTarget} target - Target row element
     * @returns {RowInfo} - Returns row information in a JSON object
     */
    getRowInfo(target: Element | EventTarget): RowInfo;
    /**
     * Gets UID by column name.
     *
     * @param  {string} field - Specifies the column name.
     * @returns {string} - Returns unique id based on column field name given
     */
    getUidByColumnField(field: string): string;
    /**
     * Gets the visible columns from the TreeGrid.
     *
     * @returns {Column[]} - Returns visible columns collection
     */
    getVisibleColumns(): Column[];
    /**
     * By default, TreeGrid shows the spinner for all its actions. You can use this method to show spinner at your needed time.
     *
     * @returns {void}
     */
    showSpinner(): void;
    /**
     * Manually shown spinner needs to hide by `hideSpinnner`.
     *
     * @returns {void}
     */
    hideSpinner(): void;
    /**
     * Refreshes the TreeGrid header and content.
     *
     * @returns {void}
     */
    refresh(): void;
    /**
     * Get the records of checked rows.
     *
     * @returns {Object[]} - Returns records that has been checked
     * @isGenericType true
     */
    getCheckedRecords(): Object[];
    /**
     * Get the visible records corresponding to rows visually displayed.
     *
     * @returns {Object[]} - Returns visible records based on collapse state of rows
     * @isGenericType true
     */
    getVisibleRecords(): Object[];
    /**
     * Get the indexes of checked rows.
     *
     * @returns {number[]} - Returns checked row indexes
     */
    getCheckedRowIndexes(): number[];
    /**
     * Checked the checkboxes using rowIndexes.
     *
     * @param {number[]} indexes - row indexes
     * @returns {void}
     */
    selectCheckboxes(indexes: number[]): void;
    /**
     * Refreshes the TreeGrid column changes.
     *
     * @param {boolean} refreshUI - Defined whether to refresh the DOM
     * @returns {void}
     */
    refreshColumns(refreshUI?: boolean): void;
    /**
     * Refreshes the TreeGrid header.
     *
     * @returns {void}
     */
    refreshHeader(): void;
    /**
     * Expands or collapse child records
     *
     * @param {HTMLElement} target - Expand collapse icon cell as target element
     * @returns {void}
     * @hidden
     */
    private expandCollapseRequest;
    /**
     * Expands child rows
     *
     * @param {HTMLTableRowElement} row - Expands the given row
     * @param {Object} record - Expands the given record
     * @param {Object} key - Primary key value
     * @param {number} level - Specifies the hierarchical level of the record
     * @returns {void}
     */
    expandRow(row: HTMLTableRowElement, record?: Object, key?: Object, level?: number): void;
    private expandRows;
    private expandCollapseAllChildren;
    private setHeightForFrozenContent;
    private getCollapseExpandRecords;
    /**
     * Collapses child rows
     *
     * @param {HTMLTableRowElement} row - Collapse the given row
     * @param {Object} record - Collapse the given record
     * @param {Object} key - Primary key value
     * @returns {void}
     */
    collapseRow(row: HTMLTableRowElement, record?: Object, key?: Object): void;
    private collapseRows;
    private updateExpandStateMapping;
    /**
     * Expands the records at specific hierarchical level
     *
     * @param {number} level - Expands the parent rows at given level
     * @returns {void}
     */
    expandAtLevel(level: number): void;
    /**
     * Expands the records by given primary key value
     *
     * @param {Object} key - Expands the parent rows with given primary key value
     * @returns {void}
     */
    expandByKey(key: Object): void;
    private expandAction;
    private getRecordDetails;
    /**
     * Collapses the records at specific hierarchical level
     *
     * @param {number} level - Define the parent row level which needs to be collapsed
     * @returns {void}
     */
    collapseAtLevel(level: number): void;
    /**
     * Collapses the records by given primary key value
     *
     * @param {Object} key - Collapses the parent rows with given primary key value
     * @returns {void}
     */
    collapseByKey(key: Object): void;
    private expandCollapseActionByKey;
    private collapseAction;
    /**
     * Expands All the rows
     *
     * @returns {void}
     */
    expandAll(): void;
    /**
     * Collapses All the rows
     *
     * @returns {void}
     */
    collapseAll(): void;
    private expandCollapseAll;
    private expandCollapse;
    private updateChildOnDemand;
    private remoteExpand;
    private localExpand;
    private updateAltRow;
    private treeColumnRowTemplate;
    private collapseRemoteChild;
    /**
     * Method to sanitize html element
     *
     * @param {any} value - Specifies the html value to sanitize
     * @returns {any} Returns the sanitized html value
     * @hidden
     */
    private sanitize;
    /**
     * Updates the rows and cells
     *
     * @param {Object[]} records - Updates the given records
     * @param {HTMLTableRowElement[]} rows - Updates the given rows
     * @param {number} index -  Updates the given cell index
     * @returns {void}
     */
    private updateRowAndCellElements;
    /**
     * @hidden
     * @returns {void}
     */
    addListener(): void;
    private updateResultModel;
    /**
     * @hidden
     * @returns {void}
     */
    private removeListener;
    /**
     * Filters TreeGrid row by column name with the given options.
     *
     * @param  {string} fieldName - Defines the field name of the column.
     * @param  {string} filterOperator - Defines the operator to filter records.
     * @param  {string | number | Date | boolean} filterValue - Defines the value used to filter records.
     * @param  {string} predicate - Defines the relationship between one filter query and another by using AND or OR predicate.
     * @param  {boolean} matchCase - If match case is set to true, the TreeGrid filters the records with exact match. if false, it filters
     * case insensitive records (uppercase and lowercase letters are treated the same).
     * @param  {boolean} ignoreAccent - If ignoreAccent is set to true,
     * then filter ignores diacritic characters or accents while filtering.
     * @param  {string} actualFilterValue - Defines the actual filter value for filter column.
     * @param  {string} actualOperator - Defines the actual filter operator for filter column.
     * @returns {void}
     */
    filterByColumn(fieldName: string, filterOperator: string, filterValue: string | number | Date | boolean | number[] | string[] | Date[] | boolean[], predicate?: string, matchCase?: boolean, ignoreAccent?: boolean, actualFilterValue?: string, actualOperator?: string): void;
    /**
     * Clears all the filtered rows of the TreeGrid.
     *
     * @returns {void}
     */
    clearFiltering(): void;
    /**
     * Removes filtered column by field name.
     *
     * @param  {string} field - Defines column field name to remove filter.
     * @param  {boolean} isClearFilterBar -  Specifies whether the filter bar value needs to be cleared.
     * @returns {void}
     * @hidden
     */
    removeFilteredColsByField(field: string, isClearFilterBar?: boolean): void;
    /**
     * Selects a row by given index.
     *
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void}
     */
    selectRow(index: number, isToggle?: boolean): void;
    /**
     * Selects a collection of rows by indexes.
     *
     * @param  {number[]} rowIndexes - Specifies the row indexes.
     * @returns {void}
     */
    selectRows(rowIndexes: number[]): void;
    /**
     * Deselects the current selected rows and cells.
     *
     * @returns {void}
     */
    clearSelection(): void;
    /**
     * Copy the selected rows or cells data into clipboard.
     *
     * @param {boolean} withHeader - Specifies whether the column header text needs to be copied along with rows or cells.
     * @returns {void}
     */
    copy(withHeader?: boolean): void;
    /**
     * Paste data from clipboard to selected cells.
     *
     * @param {boolean} data - Specifies the date for paste.
     * @param {boolean} rowIndex - Specifies the row index.
     * @param {boolean} colIndex - Specifies the column index.
     * @returns {void}
     */
    paste(data: string, rowIndex: number, colIndex: number): void;
    /**
     * Selects a cell by the given index.
     *
     * @param  {IIndex} cellIndex - Defines the row and column indexes.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void}
     */
    selectCell(cellIndex: IIndex, isToggle?: boolean): void;
    /**
     * Gets the collection of selected rows.
     *
     * @returns {Element[]} - Returns selected row elements collection
     */
    getSelectedRows(): Element[];
    /**
     * Gets a movable table cell by row and column index.
     *
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @returns {Element} - Returns movable cell element from the indexes passed
     */
    getMovableCellFromIndex(rowIndex: number, columnIndex: number): Element;
    /**
     * Gets all the TreeGrid's movable table data rows.
     *
     * @returns {Element[]} - Returns element collection of movable rows
     */
    getMovableDataRows(): Element[];
    /**
     * Gets a movable tables row by index.
     *
     * @param  {number} index - Specifies the row index.
     * @returns {Element} - Returns movable row based on index passed
     */
    getMovableRowByIndex(index: number): Element;
    /**
     * Gets the TreeGrid's movable content rows from frozen treegrid.
     *
     * @returns {Element[]}: Returns movable row element
     */
    getMovableRows(): Element[];
    /**
     * Gets a frozen right tables row element by index.
     *
     * @param  {number} index - Specifies the row index.
     * @returns {Element} returns the element
     */
    getFrozenRightRowByIndex(index: number): Element;
    /**
     * Gets the Tree Grid's frozen right content rows from frozen Tree Grid.
     *
     * @returns {Element[]} returns the element
     */
    getFrozenRightRows(): Element[];
    /**
     * Gets all the Tree Grid's frozen right table data rows.
     *
     * @returns {Element[]} Returns the Element
     */
    getFrozenRightDataRows(): Element[];
    /**
     * Gets a frozen right table cell by row and column index.
     *
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @returns {Element} Returns the Element
     */
    getFrozenRightCellFromIndex(rowIndex: number, columnIndex: number): Element;
    /**
     * Gets a frozen left column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} Returns the Element
     */
    getFrozenLeftColumnHeaderByIndex(index: number): Element;
    /**
     * Gets a frozen right column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} Returns the Element
     */
    getFrozenRightColumnHeaderByIndex(index: number): Element;
    /**
     * Gets a movable column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} Returns the Element
     */
    getMovableColumnHeaderByIndex(index: number): Element;
    /**
     * @hidden
     * @returns {number} Returns the movable column count
     */
    getMovableColumnsCount(): number;
    /**
     * @hidden
     * @returns {number} Returns the Frozen Left column
     */
    getFrozenLeftColumnsCount(): number;
    /**
     * @hidden
     * @returns {number} Returns the Frozen Right column count
     */
    getFrozenRightColumnsCount(): number;
    /**
     * @hidden
     * @returns {Column[]} Returns the column
     */
    getFrozenLeftColumns(): Column[];
    /**
     * @hidden
     * @returns {Column[]} Returns the column
     */
    getFrozenRightColumns(): Column[];
    /**
     * @hidden
     * @returns {number} Returns the visible movable count
     */
    getVisibleMovableCount(): number;
    /**
     * @hidden
     * @returns {number} Returns the visible Frozen Right count
     */
    getVisibleFrozenRightCount(): number;
    /**
     * @hidden
     * @returns {number} Returns the visible Frozen left count
     */
    getVisibleFrozenLeftCount(): number;
    /**
     * @hidden
     * @returns {Column[]} Returns the column
     */
    getMovableColumns(): Column[];
    /**
     * Gets the number of frozen column in tree grid
     *
     * @hidden
     * @returns {number} - Returns frozen column count
     */
    getFrozenColumns(): number;
    private getFrozenCount;
    /**
     * Gets the collection of selected row indexes.
     *
     * @returns {number[]} - Returns selected rows index collection
     */
    getSelectedRowIndexes(): number[];
    /**
     * Gets the collection of selected row and cell indexes.
     *
     * @returns {ISelectedCell[]} - Returns selected cell's index details
     */
    getSelectedRowCellIndexes(): ISelectedCell[];
    /**
     * Gets the collection of selected records.
     *
     * @isGenericType true
     * @returns {Object[]} - Returns selected records collection
     */
    getSelectedRecords(): Object[];
    /**
     * Gets the data module.
     *
     * @returns {{baseModule: Data, treeModule: DataManipulation}}: Returns grid and treegrid data module
     */
    getDataModule(): {
        baseModule: Data;
        treeModule: DataManipulation;
    };
    /**
     * Reorder the rows based on given indexes and position
     *
     * @param {number[]} fromIndexes - Source indexes of rows
     * @param {number} toIndex - Destination index of row
     * @param {string} position - Defines drop position as above or below or child
     * @returns {void}
     */
    reorderRows(fromIndexes: number[], toIndex: number, position: string): void;
    /**
     * Indents the record to one level of hierarchy. Moves the selected row as the last child of its previous row.
     *
     * @param {Object} record – specifies the record to do indented
     * @returns {void}
     */
    indent(record?: Object): void;
    /**
     * Outdent the record to one level of hierarchy. Moves the selected row as sibling to its parent row.
     *
     * @param {Object} record – specifies the record to do outdented
     * @returns {void}
     */
    outdent(record?: Object): void;
    /**
     * `columnchooserModule` is used to dynamically show or hide the TreeGrid columns.
     *
     * @hidden
     */
    columnChooserModule: ColumnChooser;
    /**
     * The `toolbarModule` is used to manipulate ToolBar items and its action in the TreeGrid.
     */
    toolbarModule: Toolbar;
    /**
     * The `editModule` is used to handle TreeGrid content manipulation.
     */
    editModule: Edit;
    /**
     * The `pagerModule` is used to manipulate paging in the TreeGrid.
     */
    pagerModule: Page;
}
