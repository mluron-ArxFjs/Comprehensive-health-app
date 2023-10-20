/**
 * Defines Actions of the Grid. They are
 * ```props
 * * paging :-  Defines current action as paging.
 * * refresh :- Defines current action as refresh.
 * * sorting :- Defines current action as sorting.
 * * selection :- Defines current action as selection.
 * * filtering :- Defines current action as filtering.
 * * searching :- Defines current action as searching.
 * * rowdraganddrop :- Defines current action as row drag and drop.
 * * reorder :- Defines current action as reorder.
 * * grouping :- Defines current action as grouping.
 * * ungrouping :- Defines current action as ungrouping.
 * * batchsave :- Defines current action as batch save.
 * * virtualscroll :- Defines current action as virtual scroll.
 * * print :- Defines current action as print.
 * * beginEdit :- Defines current action as begin edit.
 * * save :- Defines current action as save.
 * * delete :- Defines current action as delete.
 * * cancel :- Defines current action as cancel.
 * * add :- Defines current action as add.
 * * filterBeforeOpen :- Defines current action as filter before open.
 * * filterchoicerequest :- Defines current action as filter choice request.
 * * filterAfterOpen :- Defines current action as filter after open.
 * * filterSearchBegin :- Defines current action as filter search begin.
 * * columnstate :- represents the column state.
 * * infiniteScroll :- Defines current action as infinite scroll.
 * * stringfilterreques :- Defines current action as string filter request.
 * ```
 */
export declare type Action = 'paging' | 'refresh' | 'sorting' | 'selection' | 'filtering' | 'searching' | 'rowdraganddrop' | 'reorder' | 'grouping' | 'ungrouping' | 'batchsave' | 'virtualscroll' | 'print' | 'beginEdit' | 'save' | 'delete' | 'cancel' | 'add' | 'filterBeforeOpen' | 'filterchoicerequest' | 'filterAfterOpen' | 'filterSearchBegin' | 'columnstate' | 'infiniteScroll' | 'stringfilterrequest';
/**
 * Defines directions of Sorting. They are
 * ```props
 * * Ascending :- Defines sort direction as ascending.
 * * Descending :- Defines sort direction as descending.
 * ```
 */
export declare type SortDirection = 'Ascending' | 'Descending';
/**
 * `columnQueryMode`provides options to retrive data from the datasource. They are
 * ```props
 * * All :- Retrieves whole datasource.
 * * Schema :- Retrives data for all the defined columns in grid from the datasource.
 * * ExcludeHidden :- Retrives data only for visible columns of grid from the dataSource.
 * ```
 */
export declare type ColumnQueryModeType = 'All' | 'Schema' | 'ExcludeHidden';
/**
 * Defines types of Selection. They are
 * ```props
 * * Single :- Allows user to select a row or cell.
 * * Multiple :- Allows user to select multiple rows or cells.
 * ```
 */
export declare type SelectionType = 'Single' | 'Multiple';
/**
 * Defines modes of checkbox Selection. They are
 * ```props
 * * Default :- Allows the user to select multiple rows by clicking rows one by one.
 * * ResetOnRowClick :- Allows to reset the previously selected row when a row is clicked and multiple rows can be selected by using CTRL or SHIFT key.
 * ```
 */
export declare type CheckboxSelectionType = 'Default' | 'ResetOnRowClick';
/**
 * Defines alignments of text, they are
 * ```props
 * * Left :- Defines Left alignment
 * * Right :- Defines Right alignment
 * * Center :- Defines Center alignment
 * * Justify :- Defines Justify alignment
 * ```
 */
export declare type TextAlign = 'Left' | 'Right' | 'Center' | 'Justify';
/**
 * Defines types of Cell
 *
 * @hidden
 */
export declare enum CellType {
    /**  Defines CellType as Data */
    Data = 0,
    /**  Defines CellType as Header */
    Header = 1,
    /**  Defines CellType as Summary */
    Summary = 2,
    /**  Defines CellType as GroupSummary */
    GroupSummary = 3,
    /**  Defines CellType as CaptionSummary */
    CaptionSummary = 4,
    /**  Defines CellType as Filter */
    Filter = 5,
    /**  Defines CellType as Indent */
    Indent = 6,
    /**  Defines CellType as GroupCaption */
    GroupCaption = 7,
    /**  Defines CellType as GroupCaptionEmpty */
    GroupCaptionEmpty = 8,
    /**  Defines CellType as Expand */
    Expand = 9,
    /**  Defines CellType as HeaderIndent */
    HeaderIndent = 10,
    /**  Defines CellType as StackedHeader */
    StackedHeader = 11,
    /**  Defines CellType as DetailHeader */
    DetailHeader = 12,
    /**  Defines CellType as DetailExpand */
    DetailExpand = 13,
    /**  Defines CellType as CommandColumn */
    CommandColumn = 14,
    /**  Defines CellType as DetailFooterIntent */
    DetailFooterIntent = 15,
    /**  Defines CellType as RowDrag */
    RowDragIcon = 16,
    /**  Defines CellType as RowDragHeader */
    RowDragHIcon = 17
}
/**
 * Defines modes of GridLine, They are
 * ```props
 * * Both :- Displays both the horizontal and vertical grid lines.
 * * None :- No grid lines are displayed.
 * * Horizontal :- Displays the horizontal grid lines only.
 * * Vertical :- Displays the vertical grid lines only.
 * * Default :- Displays grid lines based on the theme.
 * ```
 */
export declare type GridLine = 'Both' | 'None' | 'Horizontal' | 'Vertical' | 'Default';
/**
 * Defines types of Render
 *
 * @hidden
 */
export declare enum RenderType {
    /**  Defines RenderType as Header */
    Header = 0,
    /**  Defines RenderType as Content */
    Content = 1,
    /**  Defines RenderType as Summary */
    Summary = 2
}
/**
 * Defines modes of Selection, They are
 * ```props
 * * Row :- Defines SelectionMode as row.
 * * Cell :- Defines SelectionMode as cell.
 * * Both :- Defines SelectionMode as both.
 * ```
 */
export declare type SelectionMode = 'Cell' | 'Row' | 'Both';
/**
 * Print mode options are
 * ```props
 * * AllPages :- Print all pages records of the Grid.
 * * CurrentPage :- Print current page records of the Grid.
 * ```
 */
export declare type PrintMode = 'AllPages' | 'CurrentPage';
/**
 * Hierarchy Grid Print modes are
 * ```props
 * * `Expanded` :- Prints the master grid with expanded child grids.
 * * `All` :- Prints the master grid with all the child grids.
 * * `None` :- Prints the master grid alone.
 * ```
 */
export declare type HierarchyGridPrintMode = 'Expanded' | 'All' | 'None';
/**
 * Defines types of Filter
 * ```props
 * * Menu :- Specifies the filter type as menu.
 * * Excel :- Specifies the filter type as excel.
 * * FilterBar :- Specifies the filter type as filter bar.
 * * CheckBox :- Specifies the filter type as check box.
 * ```
 */
export declare type FilterType = 'FilterBar' | 'Excel' | 'Menu' | 'CheckBox';
/**
 * Filter bar mode options are
 * ```props
 * * OnEnter :- Initiate filter operation after Enter key is pressed.
 * * Immediate :-  Initiate filter operation after certain time interval. By default time interval is 1500 ms.
 * ```
 */
export declare type FilterBarMode = 'OnEnter' | 'Immediate';
/**
 * Defines the aggregate types.
 * ```props
 * * Sum :- Specifies sum aggregate type.
 * * Average :- Specifies average aggregate type.
 * * Max :- Specifies maximum aggregate type.
 * * Min :- Specifies minimum aggregate type.
 * * Count :- Specifies count aggregate type.
 * * TrueCount :- Specifies true count aggregate type.
 * * FalseCount :- Specifies false count aggregate type.
 * * Custom :- Specifies custom aggregate type.
 * ```
 */
export declare type AggregateType = 'Sum' | 'Average' | 'Max' | 'Min' | 'Count' | 'TrueCount' | 'FalseCount' | 'Custom';
/**
 * Defines the wrap mode.
 * ```props
 * * Both :-  Wraps both header and content.
 * * Header :- Wraps header alone.
 * * Content :- Wraps content alone.
 * ```
 * {% codeBlock src='grid/textWrapSettings/index.md' %}{% endcodeBlock %}
 */
export declare type WrapMode = 'Both' | 'Header' | 'Content';
/**
 * Defines Multiple Export Type.
 * ```
 * * AppendToSheet :- Multiple Grids are exported to same Worksheet.
 * * NewSheet :- Multiple Grids are exported to separate Worksheet.
 * ```
 */
export declare type MultipleExportType = 'AppendToSheet' | 'NewSheet';
/**
 * Defines Predefined toolbar items.
 *
 * @hidden
 */
export declare type ToolbarItems = 
/** Add new record */
'Add' | 
/** Delete selected record */
'Delete' | 
/** Update edited record */
'Update' | 
/** Cancel the edited state */
'Cancel' | 
/** Edit the selected record */
'Edit' | 
/** Searches the grid records by given key */
'Search' | 
/** ColumnChooser used show/gird columns */
'ColumnChooser' | 
/** Print the Grid */
'Print' | 
/** Export the Grid to PDF format */
'PdfExport' | 
/** Export the Grid to Excel format */
'ExcelExport' | 
/** Export the Grid to CSV format */
'CsvExport' | 
/** Export the Grid to word fromat */
'WordExport';
/**
 * Defines the cell content's overflow mode. The available modes are
 * ```props
 * * `Clip` :-  Truncates the cell content when it overflows its area.
 * * `Ellipsis` :-  Displays ellipsis when the cell content overflows its area.
 * * `EllipsisWithTooltip` :- Displays ellipsis when the cell content overflows its area
 * also it will display tooltip while hover on ellipsis applied cell.
 * ```
 * {% codeBlock src='grid/clipMode/index.md' %}{% endcodeBlock %}
 */
export declare type ClipMode = 'Clip' | 'Ellipsis' | 'EllipsisWithTooltip';
/**
 * Defines the Command Buttons type.
 * ```props
 * * None :-  Edit the current record.
 * * Edit :-  Edit the current record.
 * * Delete :- Delete the current record.
 * * Save :- Save the current edited record.
 * * Cancel :- Cancel the edited state.
 * ```
 */
export declare type CommandButtonType = 'None' | 'Edit' | 'Delete' | 'Save' | 'Cancel';
/**
 * Defines the default items of context menu.
 * ```props
 * * AutoFitAll :- Auto fit the size of all columns.
 * * AutoFit :- Auto fit the current column.
 * * Group :- Group by current column.
 * * Ungroup :- Ungroup by current column.
 * * Edit :- Edit the current record.
 * * Delete :- Delete the current record.
 * * Save :- Save the edited record.
 * * Cancel :- Cancel the edited state.
 * * Copy :- Copy the selected records.
 * * PdfExport :- Export the grid as Pdf format.
 * * ExcelExport :- Export the grid as Excel format.
 * * CsvExport :- Export the grid as CSV format.
 * * SortAscending :- Sort the current column in ascending order.
 * * SortDescending :- Sort the current column in descending order.
 * * FirstPage :- Go to the first page.
 * * PrevPage :- Go to the previous page.
 * * LastPage :- Go to the last page.
 * * NextPage :- Go to the next page.
 * ```
 */
export declare type ContextMenuItem = 'AutoFitAll' | 'AutoFit' | 'Group' | 'Ungroup' | 'Edit' | 'Delete' | 'Save' | 'Cancel' | 'Copy' | 'PdfExport' | 'ExcelExport' | 'CsvExport' | 'SortAscending' | 'SortDescending' | 'FirstPage' | 'PrevPage' | 'LastPage' | 'NextPage';
/**
 * Defines the default items of Column menu.
 * ```props
 * * AutoFitAll :- Auto fit the size of all columns.
 * * AutoFit :- Auto fit the current column.
 * * Group :- Group by current column.
 * * Ungroup :- Ungroup by current column.
 * * SortAscending :- Sort the current column in ascending order.
 * * SortDescending :- Sort the current column in descending order.
 * * ColumnChooser :- show the column chooser.
 * * Filter :- show the Filter popup.
 * ```
 */
export declare type ColumnMenuItem = 'AutoFitAll' | 'AutoFit' | 'Group' | 'Ungroup' | 'SortAscending' | 'SortDescending' | 'ColumnChooser' | 'Filter';
/**
 * Defines Predefined toolbar items.
 *
 * @hidden
 */
export declare enum ToolbarItem {
    Add = 0,
    Edit = 1,
    Update = 2,
    Delete = 3,
    Cancel = 4,
    Print = 5,
    Search = 6,
    ColumnChooser = 7,
    PdfExport = 8,
    ExcelExport = 9,
    CsvExport = 10,
    WordExport = 11
}
/**
 * Defines PDF page Size.
 * ```props
 * * Letter :- Letter size
 * * Note :- Note size
 * * Legal :- Legal size
 * * A0 :- A0 size
 * * A1 :- A1 size
 * * A2 :- A2 size
 * * A3 :- A3 size
 * * A4 :- A4 size
 * * A5 :- A5 size
 * * A6 :- A6 size
 * * A7 :- A7 size
 * * A8 :- A8 size
 * * A9 :- A9 size
 * * B0 :- B0 size
 * * B1 :- B1 size
 * * B2 :- B2 size
 * * B3 :- B3 size
 * * B4 :- B4 size
 * * B5 :- B5 size
 * * Archa :- Arch A size
 * * Archb :- Arch B size
 * * Archc :- Arch C size
 * * Archd :- Arch D size
 * * Arche :- Arch E size
 * * Flsa :- Flsa size
 * * HalfLetter :- HalfLetter size
 * * Letter11x17 :- Letter11x17 size
 * * Ledger :- Ledger size
 * ```
 */
export declare type PdfPageSize = 'Letter' | 'Note' | 'Legal' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'B0' | 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'Archa' | 'Archb' | 'Archc' | 'Archd' | 'Arche' | 'Flsa' | 'HalfLetter' | 'Letter11x17' | 'Ledger';
/**
 * Defines PDF page PageOrientation.
 * ```props
 * * Landscape :- Sets landscape PDF page Orientation.
 * * Portrait :- Sets portrai PDF page Orientation.
 * ```
 */
export declare type PageOrientation = 'Landscape' | 'Portrait';
/**
 * Defines PDF ContentType.
 * ```props
 * * Image :- PDF content is Image type
 * * Line :- PDF content is Line type
 * * PageNumber :- PDF content is PageNumber type
 * * Text :- PDF content is Text type
 * ```
 */
export declare type ContentType = 'Image' | 'Line' | 'PageNumber' | 'Text';
/**
 * Defines PDF PageNumber Type.
 * ```props
 * * LowerLatin :- LowerCase Latin pageNumber
 * * LowerRoman :- LowerCase Roman pageNumber
 * * UpperLatin :- UpperCase Latin pageNumber
 * * UpperRoman :- UpperCase Roman pageNumber
 * * Numeric :- Numeric pageNumber
 * * Arabic :- Arabic pageNumber
 * ```
 */
export declare type PdfPageNumberType = 'LowerLatin' | 'LowerRoman' | 'UpperLatin' | 'UpperRoman' | 'Numeric' | 'Arabic';
/**
 * Defines the PDF dash style.
 * ```props
 * * Solid :- Solid DashStyle
 * * Dash :- Dash DashStyle
 * * Dot :- Dot DashStyle
 * * DashDot :- DashDot DashStyle
 * * DashDotDot :- DashDotDot DashStyle
 * ```
 */
export declare type PdfDashStyle = 'Solid' | 'Dash' | 'Dot' | 'DashDot' | 'DashDotDot';
/**
 * Defines PDF horizontal alignment.
 * ```props
 * * Left :- Aligns PDF content to left.
 * * Right :- Aligns PDF content to right.
 * * Center :- Aligns PDF content to center.
 * * Justify :- Aligns PDF content to justify.
 * ```
 */
export declare type PdfHAlign = 'Left' | 'Right' | 'Center' | 'Justify';
/**
 * Defines PDF vertical alignment.
 * ```props
 * * Top :- Aligns PDF content to top.
 * * Bottom :- Aligns PDF content to bottom.
 * * Middle :- Aligns PDF content to middle.
 * ```
 */
export declare type PdfVAlign = 'Top' | 'Bottom' | 'Middle';
/**
 * Defines Export Type.
 * ```props
 * * AllPages :- All pages of the grid is exported.
 * * CurrentPage :- Current page in grid is exported.
 * ```
 */
export declare type ExportType = 'AllPages' | 'CurrentPage';
/**
 * Defines Excel horizontal alignment.
 * ```props
 * * Left :- Aligns excel content to left.
 * * Right :- Aligns excel content to right.
 * * Center :- Aligns excel content to center.
 * * Fill :- Aligns excel content to fill.
 * ```
 */
export declare type ExcelHAlign = 'Left' | 'Right' | 'Center' | 'Fill';
/**
 * Defines Excel vertical alignment.
 * ```props
 * * Top :- Aligns excel content to top.
 * * Bottom :- Aligns excel content to bottom.
 * * Center :- Aligns excel content to center.
 * * Justify :- Aligns excel content to justify.
 * ```
 */
export declare type ExcelVAlign = 'Top' | 'Bottom' | 'Center' | 'Justify';
/**
 * Defines excel border line style.
 * ```props
 * * thin :- Excel border line style as thin line.
 * * thick :- Excel border line style as thick line.
 * ```
 */
export declare type ExcelBorderLineStyle = 'thin' | 'thick';
/**
 * Defines border line style.
 * ```props
 * * thin :- Border line style as thin line.
 * * thick :- Border line style as thick line.
 * ```
 */
export declare type BorderLineStyle = 'Thin' | 'Thick';
/**
 * Defines Check Box check state.
 * ```props
 * * Check :- Check Box check state as check.
 * * Uncheck :- Check Box check state as uncheck.
 * * Intermediate :- Check Box check state as intermediate.
 * * None :- Check Box check state as none.
 * ```
 */
export declare type CheckState = 'Check' | 'Uncheck' | 'Intermediate' | 'None';
/**
 * Defines mode of cell selection.
 * ```props
 * * Flow :- Defines CellSelectionMode as Flow
 * * Box :- Defines CellSelectionMode as Box
 * * BoxWithBorder :- Defines CellSelectionMode as Box with border
 * ```
 */
export declare type CellSelectionMode = 'Flow' | 'Box' | 'BoxWithBorder';
/**
 * Defines modes of editing.
 * ```props
 * * Normal :-  Defines EditMode as Normal
 * * Dialog :- Defines EditMode as Dialog
 * * Batch :- Defines EditMode as Batch
 * ```
 */
export declare type EditMode = 'Normal' | 'Dialog' | 'Batch';
/**
 * Defines adding new row position.
 * ```props
 * * Top :- Defines row adding position as Top
 * * Bottom :- Defines row adding position as Bottom
 * ```
 */
export declare type NewRowPosition = 'Top' | 'Bottom';
/**
 * Defines the Edit Type of the column
 * ```props
 * * DefaultEdit :- Defines EditType as DefaultEdit
 * * DropdownEdit :- Defines EditMode as Dropdownedit
 * * BooleanEdit :- Defines EditMode as Booleanedit
 * * DatepickerEdit :- Defines EditMode as Datepickeredit
 * * DatetimepickerEdit :- Defines EditType as Datetimepickeredit
 * * NumericEdit :- Defines EditMode as Numericedit
 * ```
 */
export declare type EditType = 'defaultEdit' | 'dropDownEdit' | 'booleanEdit' | 'datePickerEdit' | 'dateTimePickerEdit' | 'numericEdit';
/**
 * Defines the Column Type
 * ```props
 * * none :- Defines ColumnType as Null.
 * * String :- Defines ColumnType as String.
 * * Number :- Defines ColumnType as Number.
 * * Boolean :- Defines ColumnType as Boolean.
 * * Date :- Defines ColumnType as Date.
 * * DateTime :- Defines ColumnType as DateTime.
 * * checkBox :- Defines ColumnType as checkBox.
 * ```
 */
export declare type ColumnType = 'none' | 'string' | 'number' | 'boolean' | 'date' | 'dateTime' | 'checkBox';
/**
 * Defines the Aggregate Template Type
 * ```props
 * * groupCaptionTemplate :- Defines Aggregate Template Type as GroupCaption.
 * * groupFooterTemplate :- Defines Aggregate Template Type as GroupFooter.
 * * footerTemplate :- Defines Aggregate Template Type as Footer.
 * ```
 */
export declare type AggregateTemplateType = 'GroupCaption' | 'GroupFooter' | 'Footer';
/**
 * Defines mode of resizing.
 * ```props
 * * Normal :- Columns will not be adjusted to fit the remaining space.
 * * Auto :- Resized column width will be adjusted by other columns automatically.
 * ```
 */
export declare type ResizeMode = 'Normal' | 'Auto';
/**
 * Defines freeze direction of the grid columns
 * ```props
 * * Left :- freeze the columns at left.
 * * Right :- freeze the columns at right.
 * ```
 */
export declare type freezeDirection = 'Left' | 'Right';
/**
 * Defines rendered part of the grid column
 *
 * @hidden
 */
export declare type freezeTable = 
/**  Defines rendered the column at frozen left part */
'frozen-left' | 
/**  Defines rendered the columns at frozen right part */
'frozen-right' | 
/**  Defines rendered the columns at movable part */
'movable';
/**
 * Defines name of the Grid frozen mode
 * ```props
 * * Left :- Left frozen mode
 * * Right :- Right frozen mode
 * * Left-Right :- Left and right frozen mode
 * ```
 */
export declare type freezeMode = 'Left' | 'Right' | 'Left-Right';
/**
 * Defines types of responsive dialogs
 *
 * @hidden
 */
export declare enum ResponsiveDialogAction {
    /**  Defines dialog type as Edit */
    isEdit = 0,
    /**  Defines dialog type as Add */
    isAdd = 1,
    /**  Defines dialog type as Sort */
    isSort = 2,
    /**  Defines dialog type as Filter */
    isFilter = 3
}
/**
 * Defines responsive toolbar actions
 *
 * @hidden
 */
export declare enum ResponsiveToolbarAction {
    /**  Defines initial responsive toolbar buttons */
    isInitial = 0,
    /**  Defines responsive toolbar search */
    isSearch = 1
}
/**
 * Defines mode of row rendering.
 * ```props
 * * Horizontal :- Defines horizontal row rendeing
 * * Vertical :- Defined vertical row rendering
 * ```
 */
export declare type RowRenderingDirection = 'Horizontal' | 'Vertical';
/**
 * Defines keyboard focus keys.
 *
 * @hidden
 */
export declare type FocusKeys = 'downArrow' | 'upArrow' | 'PageUp' | 'PageDown' | 'enter' | 'shiftEnter' | 'tab' | 'shiftTab';
/**
 * Defines Loading Indicator of the Grid.
 * ```props
 * * Spinner :- Defines Loading Indicator as Spinner.
 * * Shimmer :- Defines Loading Indicator as Shimmer.
 * ```
 */
export declare type IndicatorType = 'Spinner' | 'Shimmer';
/**
 * Defines active name.
 *
 * @hidden
 */
export declare type ActiveName = 'FrozenLeftHeader' | 'Movableheader' | 'FrozenRightHeader' | 'FrozenLeftContent' | 'MovableContent' | 'FrozenRightContent';
