import { Component, EmitType } from '@syncfusion/ej2-base';
import { Internationalization } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, L10n, ModuleDeclaration } from '@syncfusion/ej2-base';
import { KeyboardEvents, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { Dialog } from '@syncfusion/ej2-popups';
import { RowDragEventArgs } from '@syncfusion/ej2-grids';
import { GanttModel } from './gantt-model';
import { TaskProcessor } from './task-processor';
import { GanttChart } from './gantt-chart';
import { Timeline } from '../renderer/timeline';
import { GanttTreeGrid } from './tree-grid';
import { Toolbar } from '../actions/toolbar';
import { CriticalPath } from '../actions/critical-path';
import { IGanttData, IWorkingTimeRange, IQueryTaskbarInfoEventArgs, BeforeTooltipRenderEventArgs, IDependencyEventArgs } from './interface';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-treegrid';
import { ITaskbarEditedEventArgs, IParent, ITaskData, PdfColumnHeaderQueryCellInfoEventArgs } from './interface';
import { ICollapsingEventArgs, CellEditArgs, PdfQueryTimelineCellInfoEventArgs } from './interface';
import { IConnectorLineObject, IValidateArgs, IValidateMode, ITaskAddedEventArgs, IKeyPressedEventArgs } from './interface';
import { PdfExportProperties, ISplitterResizedEventArgs } from './interface';
import { ZoomEventArgs, IActionBeginEventArgs, CellSelectingEventArgs, RowDeselectEventArgs, PdfQueryCellInfoEventArgs } from './interface';
import { ITimeSpanEventArgs, ZoomTimelineSettings, QueryCellInfoEventArgs, RowDataBoundEventArgs, RowSelectEventArgs } from './interface';
import { TaskFieldsModel, TimelineSettingsModel, SplitterSettingsModel, SortSettingsModel } from '../models/models';
import { EventMarkerModel, AddDialogFieldSettingsModel, EditDialogFieldSettingsModel, EditSettingsModel } from '../models/models';
import { HolidayModel, DayWorkingTimeModel, FilterSettingsModel, SelectionSettingsModel, LoadingIndicatorModel } from '../models/models';
import { LabelSettingsModel } from '../models/models';
import { SearchSettingsModel, ResourceFieldsModel } from '../models/models';
import { ItemModel, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DateProcessor } from './date-processor';
import { ChartRows } from '../renderer/chart-rows';
import { Dependency } from '../actions/dependency';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { Column, ColumnModel } from '../models/column';
import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { Sort } from '../actions/sort';
import { CellSelectEventArgs, ISelectedCell, ContextMenuItemModel } from '@syncfusion/ej2-grids';
import { CellDeselectEventArgs, IIndex, FailureEventArgs } from '@syncfusion/ej2-grids';
import { HeaderCellInfoEventArgs, ColumnMenuClickEventArgs, ColumnMenuOpenEventArgs } from '@syncfusion/ej2-grids';
import { ColumnMenuItemModel, ExcelQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { ExcelExportProperties, ExcelExportCompleteArgs, ExcelHeaderQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { RowDD } from '../actions/rowdragdrop';
import { Filter } from '../actions/filter';
import { PageEventArgs, FilterEventArgs, SortEventArgs, ResizeArgs, ColumnDragEventArgs } from '@syncfusion/ej2-grids';
import { RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';
import { ConnectorLine } from '../renderer/connector-line';
import { ConnectorLineEdit } from '../actions/connector-line-edit';
import { Edit } from '../actions/edit';
import { Splitter } from './splitter';
import { ResizeEventArgs, ResizingEventArgs } from '@syncfusion/ej2-layouts';
import { TooltipSettingsModel } from '../models/tooltip-settings-model';
import { Tooltip } from '../renderer/tooltip';
import { ToolbarItem, ColumnMenuItem, RowPosition, DurationUnit, SortDirection } from './enum';
import { GridLine, ContextMenuItem, ScheduleMode, ViewType } from './enum';
import { Selection } from '../actions/selection';
import { ExcelExport } from '../actions/excel-export';
import { DayMarkers } from '../actions/day-markers';
import { ContextMenu } from './../actions/context-menu';
import { RowSelectingEventArgs } from './interface';
import { ContextMenuOpenEventArgs as CMenuOpenEventArgs, ContextMenuClickEventArgs as CMenuClickEventArgs } from './interface';
import { ColumnMenu } from '../actions/column-menu';
import { ITaskbarClickEventArgs, RecordDoubleClickEventArgs, IMouseMoveEventArgs } from './interface';
import { PdfExport } from '../actions/pdf-export';
import { WorkUnit, TaskType } from './enum';
import { FocusModule } from '../actions/keyboard';
import { VirtualScroll } from '../actions/virtual-scroll';
import { TaskbarEdit } from '../actions/taskbar-edit';
/**
 *
 * Represents the Gantt chart component.
 * ```html
 * <div id='gantt'></div>
 * <script>
 *  var ganttObject = new Gantt({
 *      taskFields: { id: 'taskId', name: 'taskName', startDate: 'startDate', duration: 'duration' }
 *  });
 *  ganttObject.appendTo('#gantt');
 * </script>
 * ```
 */
export declare class Gantt extends Component<HTMLElement> implements INotifyPropertyChanged {
    /** @hidden */
    chartPane: HTMLElement;
    /** @hidden */
    treeGridPane: HTMLElement;
    /** @hidden */
    private contentMaskTable;
    /** @hidden */
    private headerMaskTable;
    /** @hidden */
    private isProjectDateUpdated;
    currentSelection: any;
    columnLoop: any;
    showIndicator: boolean;
    singleTier: number;
    isVirtualScroll: boolean;
    scrollLeftValue: any;
    isToolBarClick: any;
    isLocaleChanged: boolean;
    initialLoadData: Object;
    previousGanttColumns: ColumnModel[];
    /** @hidden */
    topBottomHeader: any;
    /** @hidden */
    splitterElement: HTMLElement;
    /** @hidden */
    toolbarModule: Toolbar;
    /** @hidden */
    focusModule: FocusModule;
    /** @hidden */
    ganttChartModule: GanttChart;
    /** @hidden */
    treeGridModule: GanttTreeGrid;
    /** @hidden */
    chartRowsModule: ChartRows;
    /** @hidden */
    connectorLineModule: ConnectorLine;
    taskbarEditModule: TaskbarEdit;
    /** @hidden */
    connectorLineEditModule: ConnectorLineEdit;
    /** @hidden */
    splitterModule: Splitter;
    /** @hidden */
    isCancelled: boolean;
    /** @hidden */
    treeGrid: TreeGrid;
    /** @hidden */
    controlId: string;
    /** @hidden */
    ganttHeight: number;
    /** @hidden */
    initialChartRowElements: NodeListOf<Element>;
    /** @hidden */
    ganttWidth: number;
    /** @hidden */
    predecessorModule: Dependency;
    /** @hidden */
    localeObj: L10n;
    /** @hidden */
    dataOperation: TaskProcessor;
    /** @hidden */
    flatData: IGanttData[];
    /** @hidden */
    currentViewData: IGanttData[];
    /** @hidden */
    updatedRecords: IGanttData[];
    /** @hidden */
    ids: string[];
    /** resource-task Ids */
    /** @hidden */
    taskIds: string[];
    /** @hidden */
    previousRecords: object;
    /** @hidden */
    editedRecords: IGanttData[];
    /** @hidden */
    modifiedRecords: IGanttData[];
    /** @hidden */
    isOnEdit: boolean;
    /** @hidden */
    isOnDelete: boolean;
    /** @hidden */
    secondsPerDay: number;
    /** @hidden */
    nonWorkingHours: number[];
    /** @hidden */
    workingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    nonWorkingTimeRanges: IWorkingTimeRange[];
    /** @hidden */
    defaultStartTime?: number;
    /** @hidden */
    defaultEndTime?: number;
    /** @hidden */
    nonWorkingDayIndex?: number[];
    /** @hidden */
    durationUnitTexts?: Object;
    /** @hidden */
    durationUnitEditText?: Object;
    /** @hidden */
    isMileStoneEdited?: Object;
    /** @hidden */
    chartVerticalLineContainer?: HTMLElement;
    /** @hidden */
    updatedConnectorLineCollection?: IConnectorLineObject[];
    /** @hidden */
    connectorLineIds?: string[];
    /** @hidden */
    predecessorsCollection?: IGanttData[];
    /** @hidden */
    isInPredecessorValidation?: boolean;
    /** @hidden */
    isValidationEnabled?: boolean;
    /** @hidden */
    isLoad?: boolean;
    /** @hidden */
    editedTaskBarItem?: IGanttData;
    /** @hidden */
    validationDialogElement?: Dialog;
    /** @hidden */
    currentEditedArgs?: IValidateArgs;
    /** @hidden */
    dialogValidateMode?: IValidateMode;
    /** @hidden */
    perDayWidth?: number;
    /** @hidden */
    zoomingProjectStartDate?: Date;
    /** @hidden */
    zoomingProjectEndDate?: Date;
    /** @hidden */
    cloneProjectStartDate?: Date;
    /** @hidden */
    cloneProjectEndDate?: Date;
    /** @hidden */
    totalHolidayDates?: number[];
    /** @hidden */
    columnMapping?: {
        [key: string]: string;
    };
    /** @hidden */
    ganttColumns: ColumnModel[];
    /** @hidden */
    isExpandCollapseLevelMethod: boolean;
    /** @hidden */
    isDynamicData: boolean;
    /** @hidden */
    contentHeight: number;
    /** @hidden */
    isAdaptive: Boolean;
    /**
     * The `sortModule` is used to manipulate sorting operation in Gantt.
     */
    sortModule: Sort;
    /**
     * The `filterModule` is used to manipulate filtering operation in Gantt.
     */
    filterModule: Filter;
    /** @hidden */
    scrollBarLeft: number;
    /** @hidden */
    isTimelineRoundOff: boolean;
    /** @hidden */
    columnByField: Object;
    /** @hidden */
    customColumns: string[];
    /**
     * The `editModule` is used to handle Gantt record manipulation.
     */
    editModule: Edit;
    /**
     * The `selectionModule` is used to manipulate selection operation in Gantt.
     */
    selectionModule: Selection;
    /**
     * The `virtualScrollModule` is used to handle virtual scroll in Gantt.
     */
    virtualScrollModule: VirtualScroll;
    /**
     * The `excelExportModule` is used to exporting Gantt data in excel format.
     */
    excelExportModule: ExcelExport;
    /**
     * The `rowDragandDrop` is used to manipulate Row Reordering in Gantt.
     */
    rowDragAndDropModule: RowDD;
    /**
     * The `dayMarkersModule` is used to manipulate event markers operation in Gantt.
     */
    dayMarkersModule: DayMarkers;
    /**
     * The `criticalPathModule` is used to determine the critical path  in Gantt.
     */
    criticalPathModule: CriticalPath;
    /** @hidden */
    isConnectorLineUpdate: boolean;
    /** @hidden */
    tooltipModule: Tooltip;
    /** @hidden */
    globalize: Internationalization;
    /** @hidden */
    keyConfig: {
        [key: string]: string;
    };
    /**
     * The `keyboardModule` is used to manipulate keyboard interactions in Gantt.
     */
    keyboardModule: KeyboardEvents;
    /**
     * The `contextMenuModule` is used to invoke context menu in Gantt.
     */
    contextMenuModule: ContextMenu;
    /**
     * The `columnMenuModule` is used to manipulate column menu items in Gantt.
     */
    columnMenuModule: ColumnMenu;
    /**
     * The `pdfExportModule` is used to exporting Gantt data in PDF format.
     */
    pdfExportModule: PdfExport;
    /** @hidden */
    staticSelectedRowIndex: number;
    protected needsID: boolean;
    /** @hidden */
    showActiveElement: boolean;
    /** @hidden */
    addDeleteRecord: boolean;
    /** @hidden */
    enableHeaderFocus: boolean;
    /** @hidden */
    enableValidation: boolean;
    /**
     * Enables or disables the key board interaction of Gantt.
     *
     * @default true
     */
    allowKeyboard: boolean;
    /**
     * If `enableImmutableMode`  is set to true, the Gantt Chart will reuse old rows if it exists in the new result instead of
     * full refresh while performing the Gantt actions.
     *
     * @default false
     */
    enableImmutableMode: boolean;
    /**
     * Specifies whether to allow dependency connection support for parent records.
     *
     * @default true
     */
    allowParentDependency: boolean;
    /**
     * Specifies whether to display or remove the untrusted HTML values in the TreeGrid component.
     * If `enableHtmlSanitizer` set to true, then it will sanitize any suspected untrusted strings and scripts before rendering them.
     *
     * @default false
     */
    enableHtmlSanitizer: boolean;
    /**
     * If `disableHtmlEncode` is set to true, it encodes the HTML of the header and content cells.
     *
     * @default true
     */
    disableHtmlEncode: boolean;
    /**
     * Configures the loading indicator of the Gantt Chart. Specifies whether to display spinner or shimmer effect during the waiting time on any actions performed in Gantt Chart.
     *
     * @default {indicatorType: 'Spinner'}
     */
    loadingIndicator: LoadingIndicatorModel;
    /**
     * Specifies whether to display shimmer effect during scrolling action in virtual scrolling feature. If disabled, spinner is shown instead of shimmer effect.
     *
     * @default true
     */
    enableVirtualMaskRow: boolean;
    /**
     * Specifies whether to update offset value on a task for all the predecessor edit actions.
     *
     * @default true
     */
    UpdateOffsetOnTaskbarEdit: boolean;
    /**
     * Specifies whether to auto calculate start and end-date  based on various factors such as working time, holidays, weekends, and predecessors.
     *
     * @default true
     */
    autoCalculateDateScheduling: boolean;
    /**
     * Enables or disables the focusing the task bar on click action.
     *
     * @default true
     */
    autoFocusTasks: boolean;
    /**
     * If `allowSelection` is set to true, it allows selection of (highlight row) Gantt chart rows by clicking it.
     *
     * @default true
     */
    allowSelection: boolean;
    /**
     * If `allowSorting` is set to true, it allows sorting of gantt chart tasks when column header is clicked.
     *
     * @default false
     */
    allowSorting: boolean;
    /**
     * If `enablePredecessorValidation` is set to true, it allows to validate the predecessor link.
     *
     * @default true
     */
    enablePredecessorValidation: boolean;
    /**
     * If `showColumnMenu` set to true, then it will enable the column menu options in each columns.
     *
     * @default false
     */
    showColumnMenu: boolean;
    /**
     * `columnMenuItems` defines both built-in and custom column menu items.
     * <br><br>
     * The available built-in items are,
     * * `ColumnChooser` - To show/hide the TreeGrid columns.
     * * `SortAscending` - Sort the current column in ascending order.
     * * `SortDescending` - Sort the current column in descending order.
     * * `Filter` - Filter options will show based on filterSettings property.
     *
     * @default null
     */
    columnMenuItems: ColumnMenuItem[] | ColumnMenuItemModel[];
    /**
     * By default, task schedule dates are calculated with system time zone.If Gantt chart assigned with specific time zone,
     * then schedule dates are calculated as given time zone date value.
     *
     * @default null
     */
    timezone: string;
    /**
     * If `collapseAllParentTasks` set to true, then root tasks are rendered with collapsed state.
     *
     * @default false
     */
    collapseAllParentTasks: boolean;
    /**
     * If `highlightWeekends` set to true, then all weekend days are highlighted in week - day timeline mode.
     *
     * @default false
     */
    highlightWeekends: boolean;
    /**
     * To define expander column index in Grid.
     *
     * @default 0
     * @aspType int
     */
    treeColumnIndex: number;
    /**
     * It is used to render Gantt chart rows and tasks.
     * `dataSource` value was defined as array of JavaScript objects or instances of `DataManager`.
     * {% codeBlock src='gantt/dataSource/index.md' %}{% endcodeBlock %}
     *
     * @isGenericType true
     * @default []
     */
    dataSource: Object[] | DataManager | Object;
    /**
     * `durationUnit` Specifies the duration unit for each tasks whether day or hour or minute.
     * * `day`: Sets the duration unit as day.
     * * `hour`: Sets the duration unit as hour.
     * * `minute`: Sets the duration unit as minute.
     *
     * @default day
     */
    durationUnit: DurationUnit;
    /**
     * Defines the external [`Query`](https://ej2.syncfusion.com/documentation/data/api-query.html)
     * that will be executed along with data processing.
     *
     * @default null
     */
    query: Query;
    /**
     * Specifies the dateFormat for Gantt, given format is displayed in tooltip and Grid cells.
     * By default, the format is based on the culture.
     */
    dateFormat: string;
    /**
     * Defines the height of the Gantt component container.
     *
     * @default 'auto'
     */
    height: number | string;
    /**
     * If `renderBaseline` is set to `true`, then baselines are rendered for tasks.
     *
     * @default false
     */
    renderBaseline: boolean;
    /**
     * Defines whether to enable or disable taskbar drag and drop.
     *
     * @default false
     */
    allowTaskbarDragAndDrop: boolean;
    /**
     * Defines whether taskbar to get overlapped or not.
     *
     * @default true
     */
    allowTaskbarOverlap: boolean;
    /**
     * Configures the grid lines in tree grid and gantt chart.
     *
     *  @default 'Horizontal'
     */
    gridLines: GridLine;
    /**
     * Defines the right, left and inner task labels in task bar.
     * {% codeBlock src='gantt/labelSettings/index.md' %}{% endcodeBlock %}
     */
    labelSettings: LabelSettingsModel;
    /**
     * The task bar template that renders customized child task bars from the given template.
     *
     * @default null
     * @aspType string
     */
    taskbarTemplate: string | Function;
    /**
     * The parent task bar template that renders customized parent task bars from the given template.
     *
     * @default null
     * @aspType string
     */
    parentTaskbarTemplate: string | Function;
    /**
     * The milestone template that renders customized milestone task from the given template.
     *
     * @default null
     * @aspType string
     */
    milestoneTemplate: string | Function;
    /**
     * Defines the baseline bar color.
     *
     *  @default null
     */
    baselineColor: string;
    /**
     * Defines the width of the Gantt component container.
     *
     * @default 'auto'
     */
    width: number | string;
    /**
     * If `enableVirtualization` set to true, then the Gantt will render only the rows visible within the view-port.
     * and load subsequent rows on vertical scrolling. This helps to load large dataset in Gantt.
     *
     * @default false
     */
    enableVirtualization: boolean;
    /**
     * `toolbar` defines the toolbar items of the Gantt.
     * It contains built-in and custom toolbar items
     * If an array value is assigned, it is considered as the list of built-in and custom toolbar items in the Gantt's toolbar.
     * <br><br>
     * The available built-in toolbar items are:
     * * Add: Adds a new record.
     * * Edit: Edits the selected task.
     * * Update: Updates the edited task.
     * * Delete: Deletes the selected task.
     * * Cancel: Cancels the edit state.
     * * Search: Searches tasks by the given key.
     * * ExpandAll: Expands all the task of Gantt.
     * * CollapseAll: Collapses all the task of Gantt.
     * * PrevTimeSpan: Extends timeline with one unit before the timeline start date.
     * * NextTimeSpan: Extends timeline with one unit after the timeline finish date.
     * * ZoomIn: ZoomIn the Gantt control.
     * * ZoomOut: ZoomOut the Gantt control.
     * * ZoomToFit: Display the all tasks within the viewable Gantt chart.
     * * ExcelExport: To export in Excel format.
     * * CsvExport : To export in CSV format.
     * * Indent: To indent a task to one level.
     * * Outdent: To outdent a task from one level.
     *
     * @default null
     */
    toolbar: (ToolbarItem | string | ItemModel)[];
    /**
     * Defines workweek of project.
     *
     * @default ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
     */
    workWeek: string[];
    /**
     * Defines weekend days are considered as working day or not.
     *
     * @default false
     */
    includeWeekend: boolean;
    /**
     * Enables or disables rendering of unscheduled tasks in Gantt.
     *
     * @default false
     */
    allowUnscheduledTasks: boolean;
    /**
     * To show notes column cell values inside the cell or in tooltip.
     *
     * @default false

     */
    showInlineNotes: boolean;
    /**
     * Defines height value for grid rows and chart rows in Gantt.
     *
     * @default 36
     * @aspType int
     */
    rowHeight: number;
    /**
     * Defines height of taskbar element in Gantt.
     *
     * @default null
     * @aspType int?
     */
    taskbarHeight: number;
    /**
     * Defines start date of the project, if `projectStartDate` value not set then it will be calculated from data source.
     *
     * @default null
     */
    projectStartDate: Date | string;
    /**
     * Defines end date of the project, if `projectEndDate` value not set then it will be calculated from data source.
     *
     * @default null
     */
    projectEndDate: Date | string;
    /**
     * Defines mapping property to get resource id value from resource collection.
     *
     * @default null
     */
    resourceIDMapping: string;
    /**
     * Defines mapping property to get resource name value from resource collection.
     *
     * @default null
     */
    resourceNameMapping: string;
    /**
     * Defines resource collection assigned for projects.
     *
     * @default []
     */
    resources: object[];
    /**
     * Defines segment collection assigned for tasks.
     *
     * @default []
     */
    segmentData: object[];
    /**
     * Defines background color of dependency lines.
     *
     * @default null
     */
    connectorLineBackground: string;
    /**
     * Defines width of dependency lines.
     *
     * @default 1
     * @aspType int
     */
    connectorLineWidth: number;
    /**
     * Defines column collection displayed in grid
     * If the `columns` declaration was empty then `columns` are automatically populated from `taskSettings` value.
     * {% codeBlock src='gantt/columns/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    columns: Column[] | string[] | ColumnModel[];
    /**
     * Defines the tabs and fields to be included in the add dialog.
     * If the value was empty, then it will be calculated from `taskSettings` and `columns` value.
     * {% codeBlock src='gantt/addDialogFields/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    addDialogFields: AddDialogFieldSettingsModel[];
    /**
     * Defines the tabs and fields to be included in the edit dialog.
     * If the value was empty, then it will be calculated from `taskSettings` and `columns` value.
     * {% codeBlock src='gantt/editDialogFields/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    editDialogFields: EditDialogFieldSettingsModel[];
    /**
     * The `selectedRowIndex` allows you to select a row at initial rendering.
     * You can also get the currently selected row index.
     *
     * @default -1
     * @aspType int
     */
    selectedRowIndex: number;
    /**
     * `workUnit` Specifies the work unit for each tasks whether day or hour or minute.
     * * `day`: Sets the work unit as day.
     * * `hour`: Sets the work unit as hour.
     * * `minute`: Sets the work unit as minute.
     *
     * @default hour
     */
    workUnit: WorkUnit;
    /**
     * `taskType` Specifies the task type for task whether fixedUnit or fixedWork or fixedDuration.
     * * `fixedUnit`: Sets the task type as fixedUnit.
     * * `fixedWork`: Sets the task type as fixedWork.
     * * `fixedDuration`: Sets the task type as fixedDuration.
     *
     * @default fixedUnit
     */
    taskType: TaskType;
    /**
     * Defines the view type of the Gantt.
     *
     *  @default 'ProjectView'
     */
    viewType: ViewType;
    /**
     * Defines customized working time of project.
     * {% codeBlock src='gantt/dayWorkingTime/index.md' %}{% endcodeBlock %}
     */
    dayWorkingTime: DayWorkingTimeModel[];
    /**
     * Defines holidays presented in project timeline.
     * {% codeBlock src='gantt/holidays/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    holidays: HolidayModel[];
    /**
     * Defines events and status of project throughout the timeline.
     * {% codeBlock src='gantt/eventMarkers/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    eventMarkers: EventMarkerModel[];
    /**
     * Defines mapping properties to find task values such as id, start date, end date, duration and progress values from data source.
     * {% codeBlock src='gantt/taskFields/index.md' %}{% endcodeBlock %}
     */
    taskFields: TaskFieldsModel;
    /**
     * Defines mapping properties to find resource values such as id, name, unit and group from resource collection.
     */
    resourceFields: ResourceFieldsModel;
    /**
     * Configures timeline settings of Gantt.
     * Defines default timeline modes or customized top tier mode and bottom tier mode or single tier only.
     * {% codeBlock src='gantt/timelineSettings/index.md' %}{% endcodeBlock %}
     */
    timelineSettings: TimelineSettingsModel;
    /**
     * Configure zooming levels of Gantt Timeline
     * @default []
     */
    zoomingLevels: ZoomTimelineSettings[];
    /**
     * Configures current zooming level of Gantt.
     */
    currentZoomingLevel: ZoomTimelineSettings;
    /**
     * Configures the sort settings of the Gantt.
     * {% codeBlock src='gantt/sortSettings/index.md' %}{% endcodeBlock %}
     *
     * @default {columns:[]}
     */
    sortSettings: SortSettingsModel;
    /**
     * Configures edit settings of Gantt.
     * {% codeBlock src='gantt/editSettings/index.md' %}{% endcodeBlock %}
     *
     * @default { allowAdding: false, allowEditing: false, allowDeleting: false, mode:'Auto',
     * showDeleteConfirmDialog: false }
     */
    editSettings: EditSettingsModel;
    /**
     * Enables or disables default tooltip of Gantt element and defines customized tooltip for Gantt elements.
     * {% codeBlock src='gantt/tooltipSettings/index.md' %}{% endcodeBlock %}
     *
     * @default { showTooltip: true }
     */
    tooltipSettings: TooltipSettingsModel;
    /**
     * Configures the selection settings.
     * {% codeBlock src='gantt/selectionSettings/index.md' %}{% endcodeBlock %}
     *
     * @default {mode: 'Row', type: 'Single'}
     */
    selectionSettings: SelectionSettingsModel;
    /**
     * Enables or disables filtering support in Gantt.
     *
     * @default false
     */
    allowFiltering: boolean;
    /**
     * If `allowExcelExport` set to true, then it will allow the user to export Gantt to Excel and CSV file.
     *
     * @default false
     */
    allowExcelExport: boolean;
    /**
     * If `allowRowDragAndDrop` set to true, then it will allow the user to perform drag and drop action in Gantt.
     *
     * @default false
     */
    allowRowDragAndDrop: boolean;
    /**
     * If `allowReordering` is set to true, Gantt columns can be reordered.
     * Reordering can be done by drag and drop of a particular column from one index to another index.
     *
     * @default false
     */
    allowReordering: boolean;
    /**
     * If `readOnly` is set to true, Gantt cannot be edited.
     *
     * @default false
     */
    readOnly: boolean;
    /**
     * If `allowResizing` is set to true, Gantt columns can be resized.
     *
     * @default false
     */
    allowResizing: boolean;
    /**
     * If `enableContextMenu` is set to true, Enable context menu in Gantt.
     *
     * @default false
     */
    enableContextMenu: boolean;
    /**
     * It highlights the critical tasks in the Gantt Chart that affect the project’s end date.
     *
     * @default false
     */
    enableCriticalPath: boolean;
    /**
     * `contextMenuItems` defines both built-in and custom context menu items.
     * {% codeBlock src='gantt/contextMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    contextMenuItems: ContextMenuItem[] | ContextMenuItemModel[];
    /**
     * If `allowPdfExport` set to true, then it will allow the user to export Gantt to PDF file.
     *
     * @default false
     */
    allowPdfExport: boolean;
    /**
     * If `validateManualTasksOnLinking` is set to true,
     * it enables date validation while connecting manually scheduled tasks with predecessor
     *
     * @default false
     */
    validateManualTasksOnLinking: boolean;
    /**
     * It enables to render the child taskbar on parent row for resource view Gantt.
     *
     * @default false
     */
    enableMultiTaskbar: boolean;
    /**
     * It enables to render the overallocation container for resource view Gantt.
     *
     * @default false
     */
    showOverAllocation: boolean;
    /**
     * Specifies task schedule mode for a project.
     *
     * @default 'Auto'
     */
    taskMode: ScheduleMode;
    /**
     * Configures the filter settings for Gantt.
     * {% codeBlock src='gantt/filterSettings/index.md' %}{% endcodeBlock %}
     *
     * @default {columns: [], type: 'Menu' }
     */
    filterSettings: FilterSettingsModel;
    /**
     * Configures the search settings for Gantt.
     * {% codeBlock src='gantt/searchSettings/index.md' %}{% endcodeBlock %}
     */
    searchSettings: SearchSettingsModel;
    /**
     * Configures the splitter settings for Gantt.
     * {% codeBlock src='gantt/splitterSettings/index.md' %}{% endcodeBlock %}
     */
    splitterSettings: SplitterSettingsModel;
    /**
     * @private
     */
    timelineModule: Timeline;
    /**
     * @private
     */
    dateValidationModule: DateProcessor;
    /**
     * @private
     */
    isTreeGridRendered: boolean;
    /**
     * @private
     */
    isFromOnPropertyChange: boolean;
    /**
     * @private
     */
    isFromRenderBaseline: boolean;
    /**
     * @private
     */
    isGanttChartRendered: boolean;
    /**
     * @private
     */
    isEdit: boolean;
    /**
     * This will be triggered after the taskbar element is appended to the Gantt element.
     *
     * @event queryTaskbarInfo
     */
    queryTaskbarInfo: EmitType<IQueryTaskbarInfoEventArgs>;
    /**
     * Triggers before Gantt data is exported to Excel file.
     *

     * @event beforeExcelExport
     */
    beforeExcelExport: EmitType<Object>;
    /**
     * Triggers after Gantt data is exported to Excel file.
     *

     * @event excelExportComplete
     */
    excelExportComplete: EmitType<ExcelExportCompleteArgs>;
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
     * This will be triggered before the row getting collapsed.
     *
     * @event collapsing
     */
    collapsing: EmitType<ICollapsingEventArgs>;
    /**
     * This will be triggered after the row getting collapsed.
     *
     * @event collapsed
     */
    collapsed: EmitType<ICollapsingEventArgs>;
    /**
     * This will be triggered before the row getting expanded.
     *
     * @event expanding
     */
    expanding: EmitType<ICollapsingEventArgs>;
    /**
     * This will be triggered after the row getting expanded.
     *
     * @event expanded
     */
    expanded: EmitType<ICollapsingEventArgs>;
    /**
     * Triggers when Gantt actions such as sorting, filtering, searching etc., starts.
     *
     * @event actionBegin
     */
    actionBegin: EmitType<Object | PageEventArgs | FilterEventArgs | SortEventArgs | ITimeSpanEventArgs | IDependencyEventArgs | ITaskAddedEventArgs | ZoomEventArgs>;
    /**
     * Triggers when Gantt actions such as sorting, filtering, searching etc. are completed.
     *
     * @event actionComplete
     */
    actionComplete: EmitType<FilterEventArgs | SortEventArgs | ITaskAddedEventArgs | IKeyPressedEventArgs | ZoomEventArgs>;
    /**
     * Triggers when actions are failed.
     *
     * @event actionFailure
     */
    actionFailure: EmitType<FailureEventArgs>;
    /**
     * Triggers when the Gantt actions such as Sorting, Editing etc., are done.
     * In this event,the current view data and total record count should be assigned to the `dataSource` based on the action performed.
     *
     * @event dataStateChange
     */
    dataStateChange: EmitType<DataStateChangeEventArgs>;
    /**
     * This will be triggered taskbar was dragged and dropped on new position.
     *
     * @event taskbarEdited
     */
    taskbarEdited: EmitType<ITaskbarEditedEventArgs>;
    /**
     * This will be triggered when a task get saved by cell edit.
     *
     * @event endEdit
     */
    endEdit: EmitType<ITaskbarEditedEventArgs>;
    /**
     * This will be triggered a cell get begins to edit.
     *
     * @event cellEdit
     */
    cellEdit: EmitType<CellEditArgs>;
    /**
     * Triggered before the Gantt control gets rendered.
     *
     * @event load
     */
    load: EmitType<Object>;
    /**
     * Triggers when the component is created.
     *
     * @event created
     */
    created: EmitType<Object>;
    /**
     * Triggers when the component is destroyed.
     *
     * @event destroyed
     */
    destroyed: EmitType<Object>;
    /**
     * This event will be triggered when taskbar was in dragging state.
     *
     * @event taskbarEditing
     */
    taskbarEditing: EmitType<ITaskbarEditedEventArgs>;
    /**
     * Triggers when data source is populated in the Grid.
     *
     * @event dataBound
     */
    dataBound: EmitType<Object>;
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
     * Triggers when splitter resizing starts.
     *
     * @event splitterResizeStart
     */
    splitterResizeStart: EmitType<ResizeEventArgs>;
    /**
     * Triggers when splitter bar was dragging.
     *
     * @event splitterResizing
     */
    splitterResizing: EmitType<ResizingEventArgs>;
    /**
     * Triggers when splitter resizing action completed.
     *
     * @event splitterResized
     */
    splitterResized: EmitType<ISplitterResizedEventArgs>;
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
     * Triggers before tooltip get rendered.
     *
     * @event beforeTooltipRender
     */
    beforeTooltipRender: EmitType<BeforeTooltipRenderEventArgs>;
    /**
     * Triggers before row selection occurs.
     *
     * @event rowSelecting
     */
    rowSelecting: EmitType<RowSelectingEventArgs>;
    /**
     * Triggers after row selection occurs.
     *
     * @event rowSelected
     */
    rowSelected: EmitType<RowSelectEventArgs>;
    /**
     * Triggers before deselecting the selected row.
     *

     * @event rowDeselecting
     */
    rowDeselecting: EmitType<RowDeselectEventArgs>;
    /**
     * Triggers when a selected row is deselected.
     *
     * @event rowDeselected
     */
    rowDeselected: EmitType<RowDeselectEventArgs>;
    /**
     * Triggers before any cell selection occurs.
     *
     * @event cellSelecting
     */
    cellSelecting: EmitType<CellSelectingEventArgs>;
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
     * This will be triggered before the header cell element is appended to the Grid element.
     *
     * @event queryCellInfo
     */
    queryCellInfo: EmitType<QueryCellInfoEventArgs>;
    /**
     * This will be triggered before the header cell element is appended to the Grid element.
     *
     * @event headerCellInfo
     */
    headerCellInfo: EmitType<HeaderCellInfoEventArgs>;
    /**
     * This will be triggered before the row element is appended to the Grid element.
     *
     * @event rowDataBound
     */
    rowDataBound: EmitType<RowDataBoundEventArgs>;
    /**
     * Triggers before column menu opens.
     *

     * @event columnMenuOpen
     */
    columnMenuOpen: EmitType<ColumnMenuOpenEventArgs>;
    /**
     * Triggers when toolbar item was clicked.
     *
     * @event toolbarClick
     */
    toolbarClick: EmitType<ClickEventArgs>;
    /**
     * Triggers when click on column menu.
     *
     * @event columnMenuClick
     */
    columnMenuClick: EmitType<ColumnMenuClickEventArgs>;
    /**
     * Triggers before context menu opens.
     *
     * @event contextMenuOpen
     */
    contextMenuOpen: EmitType<CMenuOpenEventArgs>;
    /**
     * Triggers when click on context menu.
     *
     * @event contextMenuClick
     */
    contextMenuClick: EmitType<CMenuClickEventArgs>;
    constructor(options?: GanttModel, element?: string | HTMLElement);
    /**
     * This event will be triggered when click on taskbar element.
     *

     * @event onTaskbarClick
     */
    onTaskbarClick: EmitType<ITaskbarClickEventArgs>;
    /**
     * This event will be triggered when double click on record.
     *

     * @event recordDoubleClick
     */
    recordDoubleClick: EmitType<RecordDoubleClickEventArgs>;
    /**
     * This event will be triggered when mouse move on Gantt.
     *

     * @event onMouseMove
     */
    onMouseMove: EmitType<IMouseMoveEventArgs>;
    /**
     * Triggers before Gantt data is exported to PDF document.
     *
     * @event beforePdfExport

     */
    beforePdfExport: EmitType<Object>;
    /**
     * Triggers after TreeGrid data is exported to PDF document.
     *
     * @event pdfExportComplete

     */
    pdfExportComplete: EmitType<Object>;
    /**
     * Triggers before exporting each cell to PDF document. You can also customize the PDF cells.
     *
     * @event pdfQueryCellInfo

     */
    pdfQueryCellInfo: EmitType<PdfQueryCellInfoEventArgs>;
    /**
     * Triggers before exporting each taskbar to PDF document. You can also customize the taskbar.
     *
     * @event pdfQueryTaskbarInfo

     */
    pdfQueryTaskbarInfo: EmitType<Object>;
    /**
     * Triggers before exporting each cell to PDF document. You can also customize the PDF cells.
     *
     * @event pdfQueryTimelineCellInfo

     */
    pdfQueryTimelineCellInfo: EmitType<PdfQueryTimelineCellInfoEventArgs>;
    /**
     * Triggers before exporting each header cell to PDF document. You can also customize the PDF cells.
     *
     * @event pdfColumnHeaderQueryCellInfo

     */
    pdfColumnHeaderQueryCellInfo: EmitType<PdfColumnHeaderQueryCellInfoEventArgs>;
    /**
     * To get the module name
     *
     * @returns {string} .
     * @private
     */
    getModuleName(): string;
    /**
     * For internal use only - Initialize the event handler
     *
     * @returns {void} .
     * @private
     */
    protected preRender(): void;
    private initProperties;
    /**
     * @returns {string} .
     * @private
     */
    getDateFormat(): string;
    /**
     * To get timezone offset.
     *
     * @returns {number} .
     * @private
     */
    private getDefaultTZOffset;
    /**
     * To check whether the date is in DST.
     *
     * @param {Date} date - Defines the date to check whether it is DST.
     * @returns {boolean} .
     * @private
     */
    isInDst(date: Date): boolean;
    /**
     * Method to map resource fields.
     *
     * @returns {void} .
     */
    private resourceFieldsMapping;
    /**
     * To validate height and width
     *
     * @param {string | number} value .
     * @returns {string} .
     */
    private validateDimentionValue;
    /**
     * To calculate dimensions of Gantt control
     *
     * @returns {void} .
     */
    private calculateDimensions;
    /**
     * @returns {void} .
     * @private
     */
    protected render(): void;
    hideMaskRow(): void;
    showMaskRow(): void;
    private renderHeaderBackground;
    private renderBackGround;
    private createMaskTable;
    private createEmptyTimeLineTable;
    private applyTimelineMaskRow;
    private createEmptyMaskTable;
    private applyMaskRow;
    /**
     * Method used to show spinner.
     *
     * @returns {void} .
     */
    showSpinner(): void;
    /**
     * Method used to hide spinner.
     *
     * @returns {void} .
     */
    hideSpinner(): void;
    /**
     * @returns {void} .
     * @private
     */
    processTimeline(): void;
    /**
     * @param {boolean} isChange -Defines whether task data is changed.
     * @returns {void} .
     * @private
     */
    renderGantt(isChange?: boolean): void;
    removeCriticalPathStyles(): void;
    private wireEvents;
    private keyDownHandler;
    /**
     * Method trigger while user perform window resize.
     *
     * @returns {void} .
     * @private
     */
    windowResize(): void;
    keyActionHandler(e: KeyboardEventArgs): void;
    /**
     * Method for updating row height value in connector line collections
     *
     * @param {IConnectorLineObject[]} collection  -Defines the CollectorLine collection.
     * @returns {void} .
     * @private
     */
    private updateRowHeightInConnectorLine;
    /**
     * @returns {void} .
     * @private
     */
    protected renderToolbar(): void;
    /**
     * @returns {void} .
     * @private
     */
    protected renderTreeGrid(): void;
    private updateCurrentViewData;
    /**
     * @param {IGanttData} records -Defines the delete record collections.
     * @returns {IGanttData} .
     * @private
     */
    getRecordFromFlatdata(records: IGanttData[]): IGanttData[];
    /**
     * @param {object} args -Update the gantt element content height.
     * @returns {void} .
     * @private
     */
    updateContentHeight(args?: object): void;
    /**
     * To get expand status.
     *
     * @param {IGanttData} data .
     * @returns {boolean} .
     * @private
     */
    getExpandStatus(data: IGanttData): boolean;
    /**
     * Get expanded records from given record collection.
     *
     * @param {IGanttData[]} records - Defines record collection.
     * @returns {IGanttData[]} .

     */
    getExpandedRecords(records: IGanttData[]): IGanttData[];
    /**
     * Getting the Zooming collections of the Gantt control
     *
     * @returns {ZoomTimelineSettings} .
     * @private
     */
    getZoomingLevels(): ZoomTimelineSettings[];
    private displayQuarterValue;
    private displayHalfValue;
    /**
     *
     * @param {Date} date .
     * @param {string} format .
     * @returns {string} .
     */
    getFormatedDate(date: Date, format?: string): string;
    /**
     * Get duration value as string combined with duration and unit values.
     *
     * @param {number} duration - Defines the duration.
     * @param {string} durationUnit - Defines the duration unit.
     * @returns {string} .
     */
    getDurationString(duration: number, durationUnit: string): string;
    /**
     * Get work value as string combined with work and unit values.
     *
     * @param {number} work - Defines the work value.
     * @param {string} workUnit - Defines the work unit.
     * @returns {string} .
     */
    getWorkString(work: number, workUnit: string): string;
    private updateTreeColumns;
    /**
     *
     * @param {object} args .
     * @returns {void} .
     * @private
     */
    treeDataBound(args: object): void;
    /**
     * @param {object} args .
     * @returns {void} .
     * @private
     */
    private getCurrentRecords;
    /**
     * Called internally, if any of the property value changed.
     *
     * @param {GanttModel} newProp - Defines the New GanttModel.
     * @param {GanttModel} oldProp - Defines the old GanttModel.
     * @returns {void} .
     * @private
     */
    onPropertyChanged(newProp: GanttModel, oldProp: GanttModel): void;
    private updateOverAllocationCotainer;
    /**
     * Returns the properties to be maintained in persisted state.
     *
     * @returns {string} .
     * @private
     */
    getPersistData(): string;
    private ignoreInArrays;
    private ignoreInColumn;
    /**
     * @returns {void} .
     * @private
     */
    destroy(): void;
    /**
     * Method to get taskbarHeight.
     *
     * @returns {number} .
     * @public
     */
    getTaskbarHeight(): number;
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} .
     * @hidden
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Sorts a column with the given options.
     *
     * @param {string} columnName - Defines the column name to be sorted.
     * @param {SortDirection} direction - Defines the direction of sorting field.
     * @param {boolean} isMultiSort - Specifies whether the previous sorted columns are to be maintained.
     * @returns {void} .
     */
    sortColumn(columnName: string, direction: SortDirection, isMultiSort?: boolean): void;
    private mergePersistGanttData;
    private mergeColumns;
    /**
     * Clears all the sorted columns of the Gantt.
     *
     * @returns {void} .
     */
    clearSorting(): void;
    /**
     * To validate and render chart horizontal and vertical lines in the Gantt
     *
     * @returns {void} .
     * @hidden
     */
    renderChartGridLines(): void;
    /**
     * To update height of the Grid lines in the Gantt chart side.
     *
     * @returns {void} .
     * @private
     */
    updateGridLineContainerHeight(): void;
    /**
     * To get actual height of grid lines, holidays, weekend and event markers.
     *
     * @returns {number} .
     * @private
     */
    getContentHeight(): number;
    /**
     * To update height of the Grid lines in the Gantt chart side.
     *
     * @returns {void} .
     * @private
     */
    reUpdateDimention(): void;
    /**
     * To render vertical lines in the Gantt chart side.
     *
     * @returns {void} .
     */
    private renderChartVerticalLines;
    /**
     * Method to get default localized text of the Gantt.
     *
     * @returns {void} .
     * @hidden
     */
    getDefaultLocale(): Object;
    /**
     * To remove sorted records of particular column.
     *
     * @param {string} columnName - Defines the sorted column name.
     * @returns {void} .
     */
    removeSortColumn(columnName: string): void;
    /**
     *
     * @param {object} args -Defines the edited event args.
     * @returns {void} .
     * @private
     */
    actionBeginTask(args: object): boolean | void;
    /**
     * To move horizontal scroll bar of Gantt to specific date.
     *
     * @param  {string} date - Defines the task date of data.
     * @returns {void} .
     */
    scrollToDate(date: string): void;
    /**
     * To move horizontal scroll bar of Gantt to specific task id.
     *
     * @param  {string} taskId - Defines the task id of data.
     * @returns {void} .
     */
    scrollToTask(taskId: string): void;
    /**
     * To set scroll left and top in chart side.
     *
     * @param  {number} left - Defines the scroll left value of chart side.
     * @param  {number} top - Defines the scroll top value of chart side.
     * @returns {void} .
     */
    updateChartScrollOffset(left: number, top: number): void;
    /**
     * Get parent task by clone parent item.
     *
     * @param {IParent} cloneParent - Defines the clone parent item.
     * @returns {IGanttData} .
     * @hidden
     */
    getParentTask(cloneParent: IParent): IGanttData;
    /**
     * Get parent task by clone parent item.
     *
     * @param {IGanttData} ganttRecord -Defines the Gantt record.
     * @param {number} level -Defines the selected record level.
     * @returns {IGanttData} .
     * @hidden
     */
    getRootParent(ganttRecord: IGanttData, level: number): IGanttData;
    /**
     * Filters TreeGrid row by column name with the given options.
     *
     * @param  {string} fieldName - Defines the field name of the column.
     * @param  {string} filterOperator - Defines the operator to filter records.
     * @param  {string | number | Date | boolean | number[] | string[] | Date[] | boolean[]} filterValue - Defines the value
     *  used to filter records.
     * @param  {string} predicate - Defines the relationship between one filter query and another by using AND or OR predicate.
     * @param  {boolean} matchCase - If match case is set to true, TreeGrid filters the records with exact match.if false, it filters case
     * insensitive records (uppercase and lowercase letters treated the same).
     * @param  {boolean} ignoreAccent - If ignoreAccent set to true,
     * then filter ignores the diacritic characters or accents while filtering.
     * @returns {void} .
     */
    filterByColumn(fieldName: string, filterOperator: string, filterValue: string | number | Date | boolean | number[] | string[] | Date[] | boolean[], predicate?: string, matchCase?: boolean, ignoreAccent?: boolean): void;
    /**
     * Export Gantt data to Excel file(.xlsx).
     *
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Gantt.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<any>} .
     */
    excelExport(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): Promise<any>;
    /**
     * Export Gantt data to CSV file.
     *
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Gantt.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<any>} .
     */
    csvExport(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): Promise<any>;
    /**
     * Export Gantt data to PDF document.
     *
     * @param  {PdfExportProperties} pdfExportProperties - Defines the export properties of the Gantt.
     * @param  {isMultipleExport} isMultipleExport - Define to enable multiple export.
     * @param  {pdfDoc} pdfDoc - Defined the Pdf Document if multiple export is enabled.
     * @param  {boolean} isBlob - If the 'isBlob' parameter is set to true, the method returns PDF data as a blob instead of exporting it as a down-loadable PDF file. The default value is false.
     * @returns {Promise<any>} .
     */
    pdfExport(pdfExportProperties?: PdfExportProperties, isMultipleExport?: boolean, pdfDoc?: Object, isBlob?: boolean): Promise<Object>;
    /**
     * Clears the filtered columns in Gantt.
     *
     * Can also be used to clear filtering of a specific column in Gantt.
     *
     * @param {string[]} fields - Defines the specific column to remove filter.
     * @returns {void} .
     */
    clearFiltering(fields?: string[]): void;
    /**
     * Removes filtered column by field name.
     *
     * @param  {string} field - Defines column field name to remove filter.
     * @returns {void} .
     * @hidden
     */
    removeFilteredColsByField(field: string): void;
    /**
     * Method to set holidays and non working days in date time and date picker controls
     *
     * @param {RenderDayCellEventArgs} args .
     * @returns {void} .
     * @private
     */
    renderWorkingDayCell(args: RenderDayCellEventArgs): void;
    /**
     * To update timeline at start point with one unit.
     *
     * @param {string} mode - Render previous span of Timeline.
     * @returns {void} .
     * @public
     */
    previousTimeSpan(mode?: string): void;
    /**
     * To update timeline at end point with one unit.
     *
     * @param {string} mode - Render next span of Timeline.
     * @returns {void} .
     * @public
     */
    nextTimeSpan(mode?: string): void;
    /**
     * To validate project start date and end date.
     *
     * @param  {Date} startDate - Defines start date of project.
     * @param  {Date} endDate - Defines end date of project.
     * @param  {boolean} isTimelineRoundOff - Defines project start date and end date need to be round off or not.
     * @param {string} isFrom .
     * @returns {void} .
     * @public
     */
    updateProjectDates(startDate: Date, endDate: Date, isTimelineRoundOff: boolean, isFrom?: string): void;
    /**
     * Split the taskbar into segment by the given date
     *
     * @param  {string} taskId - Defines the id of a task to be split.
     * @param  {string} splitDate - Defines in which date the taskbar must be split up.
     * @returns {void} .
     * @public
     */
    splitTask(taskId: number | string, splitDate: Date | Date[]): void;
    /**
     * merge the split taskbar with the given segment indexes.
     *
     * @param  {string} taskId - Defines the id of a task to be split.
     * @param  {string} segmentIndexes - Defines the object array of indexes which must be merged.
     * @returns {void} .
     * @public
     */
    mergeTask(taskId: number | string, segmentIndexes: {
        firstSegmentIndex: number;
        secondSegmentIndex: number;
    }[]): void;
    /**
     * Changes the TreeGrid column positions by field names.
     *
     * @param  {string} fromFName - Defines origin field name.
     * @param  {string} toFName - Defines destination field name.
     * @returns {void} .
     * @public
     */
    reorderColumns(fromFName: string | string[], toFName: string): void;
    /**
     * Method to clear edited collections in gantt set edit flag value
     *
     * @param {boolean} isStart -Defines whether to initiate edit action.
     * @returns {void} .
     * @private
     */
    initiateEditAction(isStart: boolean): void;
    /**
     *
     * @param {string} field Method to update value in Gantt record and make clone record for this
     * @param {IGanttData | ITaskData} record .
     * @param {boolean} isTaskData .
     * @returns {void} .
     * @private
     */
    setRecordValue(field: string, value: any, record: IGanttData | ITaskData, isTaskData?: boolean): void;
    private makeCloneData;
    private closeGanttActions;
    /**
     * Method to get task by uniqueId value.
     *
     * @param {string} id - Defines the task id.
     * @returns {IGanttData} .
     * @isGenericType true
     */
    getTaskByUniqueID(id: string): IGanttData;
    /**
     * Method to get record by id value.
     *
     * @param {string} id - Defines the id of record.
     * @returns {IGanttData} .
     * @isGenericType true
     */
    getRecordByID(id: string): IGanttData;
    /**
     * Method to set splitter position.
     *
     * @param {string|number} value - Define value to splitter settings property.
     * @param {string} type - Defines name of internal splitter settings property.
     * @returns {void} .
     */
    setSplitterPosition(value: string | number, type: string): void;
    /**
     * Expand the records by index value.
     *
     * @param {number[] | number} index - Defines the index of rows to be expand.
     * @returns {void} .
     * @public
     */
    expandByIndex(index: number[] | number): void;
    /**
     * Expand the record by task id.
     *
     * @param {number} id - Defines the id of task.
     * @returns {void} .
     * @public
     */
    expandByID(id: number | string): void;
    /**
     * Collapse the record by index value.
     *
     * @param {number} index - Defines the index of row.
     * @returns {void} .
     * @public
     */
    collapseByIndex(index: number): void;
    /**
     * Collapse the record by id value.
     *
     * @param {number} id - Defines the id of task.
     * @returns {void} .
     * @public
     */
    collapseByID(id: number | string): void;
    /**
     * Method to add record.
     *
     * @param {Object[] | IGanttData | Object} data - Defines record to add.
     * @param {RowPosition} rowPosition - Defines the position of row.
     * @param {number} rowIndex - Defines the row index.
     * @returns {void} .
     * @public
     */
    addRecord(data?: Object[] | IGanttData | Object, rowPosition?: RowPosition, rowIndex?: number): void;
    /**
     * Method to update record by ID.
     *
     * @param  {Object} data - Defines the data to modify.
     * @returns {void} .
     * @public
     */
    updateRecordByID(data: Object): void;
    /**
     * To update existing taskId with new unique Id.
     *
     * @param {number | string} currentId - Defines the current Id of the record.
     * @param {number | string} newId - Defines the new Id of the record.
     * @returns {void} .
     */
    updateTaskId(currentId: number | string, newId: number | string): void;
    /**
     * Public method to expand particular level of rows.
     *
     * @returns {void} .
     * @param {number} level .
     * @private
     */
    expandAtLevel(level: number): void;
    /**
     * To indent the level of selected task to the hierarchical Gantt task.
     *
     * @returns {void} .
     * @public
     */
    indent(): void;
    /**
     * To outdent the level of selected task from the hierarchical Gantt task.
     *
     * @returns {void} .
     * @public
     */
    outdent(): void;
    /**
     * To render the critical path tasks in Gantt.
     *
     * @returns {void} .
     * @param {boolean} isCritical- whether to render critical path or not .
     * @public
     */
    private showCriticalPath;
    /**
     * To get all the critical tasks in Gantt.
     *
     * @returns {IGanttData[]} .
     * @public
     */
    getCriticalTasks(): IGanttData[];
    /**
     * To perform Zoom in action on Gantt timeline.
     *
     * @returns {void} .
     * @public
     */
    zoomIn(): void;
    /**
     * To perform zoom out action on Gantt timeline.
     *
     * @returns {void} .
     * @public
     */
    zoomOut(): void;
    /**
     * To show all project task in available chart width
     *
     * @returns {void} .
     * @public
     */
    fitToProject(): void;
    /**
     * Reorder the rows based on given indexes and position
     *
     * @param {number[]} fromIndexes - Defines the Dragged record index.
     * @param {number} toIndex - Defines the Dropped record index.
     * @param {string} position -Defines the position of the dropped row.
     * @returns {void} .
     */
    reorderRows(fromIndexes: number[], toIndex: number, position: string): void;
    /**
     * Method to update record by Index.
     *
     * @param  {number} index - Defines the index of data to modify.
     * @param  {object} data - Defines the data to modify.
     * @returns {void} .
     * @public
     */
    updateRecordByIndex(index: number, data: Object): void;
    /**
     * To add dependency for Task.
     *
     * @param  {number} id - Defines the ID of data to modify.
     * @param  {string} predecessorString - Defines the predecessor string to add.
     * @returns {void} .
     * @public
     */
    addPredecessor(id: number | string, predecessorString: string): void;
    /**
     * To remove dependency from task.
     *
     * @param  {number} id - Defines the ID of task to modify.
     * @returns {void} .
     * @public
     */
    removePredecessor(id: number | string): void;
    /**
     * To modify current dependency values of Task by task id.
     *
     * @param  {number} id - Defines the ID of data to modify.
     * @param  {string} predecessorString - Defines the predecessor string to update.
     * @returns {void} .
     * @public
     */
    updatePredecessor(id: number | string, predecessorString: string): void;
    /**
     * Method to open Add dialog.
     *
     * @returns {void} .
     * @public
     */
    openAddDialog(): void;
    /**
     * Method to open Edit dialog.
     *
     * @param {number } taskId - Defines the id of task.
     * @returns {void} .
     * @public
     */
    openEditDialog(taskId?: number | string): void;
    /**
     * Changes the TreeGrid column positions by field names.
     *
     * @param {string | number} id .
     * @param {number} index .
     * @returns {void} .
     * @private
     */
    private contructExpandCollapseArgs;
    /**
     * Method to get chart row value by index.
     *
     * @param {number} index - Defines the index of row.
     * @returns {HTMLElement} .
     */
    getRowByIndex(index: number): HTMLElement;
    /**
     * Method to get the row element by task id.
     *
     * @param {string | number} id - Defines the id of task.
     * @returns {HTMLElement} .
     */
    getRowByID(id: string | number): HTMLElement;
    /**
     * Method to get class name for unscheduled tasks
     *
     * @param {ITaskData} ganttProp .
     * @returns {string} .
     * @private
     */
    getUnscheduledTaskClass(ganttProp: ITaskData): string;
    /**
     * Method to get class name for unscheduled tasks
     *
     * @param {ITaskData} ganttProp -Defines the Gantt propertie.
     * @returns {boolean} .
     * @private
     */
    isUnscheduledTask(ganttProp: ITaskData): boolean;
    private createGanttPopUpElement;
    /**
     * Method to get predecessor value as string.
     *
     * @param {string} type .
     * @returns {HTMLElement} .
     * @private
     */
    getPredecessorTextValue(type: string): string;
    /**
     * Method to perform search action in Gantt.
     *
     * @param {string} keyVal - Defines key value to search.
     * @returns {void} .
     */
    search(keyVal: string): void;
    /**
     * Method to get offset rect value
     *
     * @param {HTMLElement} element .
     * @returns {number} .
     * @hidden
     */
    getOffsetRect(element: HTMLElement): {
        top: number;
        left: number;
        width?: number;
        height?: number;
    };
    /**
     * Method to expand all the rows of Gantt.
     *
     * @returns {void} .
     * @public
     */
    expandAll(): void;
    /**
     * Method to update data source.
     *
     * @returns {void} .
     * @param {object[]} dataSource - Defines a collection of data.
     * @param {object} args - Defines the projectStartDate and projectEndDate values.
     * @public
     */
    updateDataSource(dataSource: Object[], args: object): void;
    /**
     * Method to collapse all the rows of Gantt.
     *
     * @returns {void} .
     * @public
     */
    collapseAll(): void;
    /**
     * Gets the columns from the TreeGrid.
     *
     * @returns {Column[]} .
     * @public
     */
    getGridColumns(): Column[];
    /**
     * Method to column from given column collection based on field value
     *
     * @param {string} field .
     * @param {ColumnModel[]} columns .
     * @returns {ColumnModel} .
     * @private
     */
    getColumnByField(field: string, columns: ColumnModel[]): ColumnModel;
    /**
     * Gets the Gantt columns.
     *
     * @returns {ColumnModel[]} .
     * @public
     */
    getGanttColumns(): ColumnModel[];
    /**
     * Shows a column by its column name.
     *
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} showBy - Defines the column key either as field name or header text.
     * @returns {void} .
     * @public
     */
    showColumn(keys: string | string[], showBy?: string): void;
    /**
     * Hides a column by column name.
     *
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} hideBy - Defines the column key either as field name or header text.
     * @returns {void} .
     * @public
     */
    hideColumn(keys: string | string[], hideBy?: string): void;
    /**
     * To set scroll top for chart scroll container.
     *
     * @param {number} scrollTop - Defines scroll top value for scroll container.
     * @returns {void} .
     * @public
     */
    setScrollTop(scrollTop: number): void;
    /**
     * Cancels edited state.
     *
     * @returns {void} .
     * @public
     */
    cancelEdit(): void;
    /**
     * Selects a cell by the given index.
     *
     * @param  {IIndex} cellIndex - Defines the row and column indexes.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void} .
     */
    selectCell(cellIndex: IIndex, isToggle?: boolean): void;
    /**
     * Selects a collection of cells by row and column indexes.
     *
     * @param  {ISelectedCell[]} rowCellIndexes - Specifies the row and column indexes.
     * @returns {void} .
     */
    selectCells(rowCellIndexes: ISelectedCell[]): void;
    /**
     * Selects a row by given index.
     *
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void} .
     */
    selectRow(index: number, isToggle?: boolean): void;
    /**
     * Selects a collection of rows by indexes.
     *
     * @param  {number[]} records - Defines the collection of row indexes.
     * @returns {void} .
     */
    selectRows(records: number[]): void;
    /**
     * Method to delete record.
     *
     * @param {number | string } taskDetail - Defines the details of data to delete.
     * @returns {void} .
     * @public
     */
    deleteRecord(taskDetail: number | string | number[] | string[] | IGanttData | IGanttData[]): void;
    /**
     * Enables or disables ToolBar items.
     *
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @returns {void} .
     */
    enableItems(items: string[], isEnable: boolean): void;
    /**
     * Deselects the current selected rows and cells.
     *
     * @returns {void} .
     */
    clearSelection(): void;
    /**
     * @param {ITaskAddedEventArgs | IActionBeginEventArgs} args .
     * @returns {ITaskAddedEventArgs | IActionBeginEventArgs} .
     * @hidden
     */
    updateDataArgs(args: ITaskAddedEventArgs | IActionBeginEventArgs): ITaskAddedEventArgs | IActionBeginEventArgs;
    /**
     * Method to convert task data to milestone data.
     *
     * @param {string} id - Defines id of record.
     * @returns {void} .
     * @public
     */
    convertToMilestone(id: string): void;
    /**
     * To change the mode of a record.
     *
     * @param {object} data - Use to change the TaskMode either manual, auto or custom.
     * @returns {void} .
     */
    changeTaskMode(data: Object): void;
    /**
     * @returns {string[]} .
     * @private
     */
    getTaskIds(): string[];
    /**
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    setTaskIds(data: IGanttData): void;
    /**
     * To render the react templates
     *
     * @returns {void} .
     *  @hidden
     */
    renderTemplates(): void;
    /**
     * To reset the react templates
     *
     * @returns {void} .
     *  @hidden
     */
    resetTemplates(): void;
}
