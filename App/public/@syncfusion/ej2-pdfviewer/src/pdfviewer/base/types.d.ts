/**
 * Enum toolbarItem for toolbar settings
 */
export declare type ToolbarItem = 'OpenOption' | 'PageNavigationTool' | 'MagnificationTool' | 'PanTool' | 'SelectionTool' | 'SearchOption' | 'PrintOption' | 'DownloadOption' | 'UndoRedoTool' | 'AnnotationEditTool' | 'FormDesignerEditTool' | 'CommentTool' | 'SubmitForm';
/**
 * Enum AnnotationToolbarItem for annotation toolbar settings
 */
export declare type AnnotationToolbarItem = 'HighlightTool' | 'UnderlineTool' | 'StrikethroughTool' | 'ShapeTool' | 'CalibrateTool' | 'ColorEditTool' | 'StrokeColorEditTool' | 'ThicknessEditTool' | 'OpacityEditTool' | 'AnnotationDeleteTool' | 'StampAnnotationTool' | 'HandWrittenSignatureTool' | 'InkAnnotationTool' | 'FreeTextAnnotationTool' | 'FontFamilyAnnotationTool' | 'FontSizeAnnotationTool' | 'FontStylesAnnotationTool' | 'FontAlignAnnotationTool' | 'FontColorAnnotationTool' | 'CommentPanelTool';
/**
 * Enum value of form designer toolbar item.
 */
export declare type FormDesignerToolbarItem = 'TextboxTool' | 'PasswordTool' | 'CheckBoxTool' | 'RadioButtonTool' | 'DropdownTool' | 'ListboxTool' | 'DrawSignatureTool' | 'DeleteTool';
/**
 * Enum LinkTarget for hyperlink navigation
 */
export declare type LinkTarget = 'CurrentTab' | 'NewTab' | 'NewWindow';
/**
 * Enum InteractionMode for interaction mode
 */
export declare type InteractionMode = 'TextSelection' | 'Pan';
/**
 * Enum type for Signature Items
 */
export declare type SignatureItem = 'Signature' | 'Initial';
/**
 * Enum AnnotationType for specifying Annotations
 */
export declare type AnnotationType = 'None' | 'Highlight' | 'Underline' | 'Strikethrough' | 'Line' | 'Arrow' | 'Rectangle' | 'Circle' | 'Polygon' | 'Distance' | 'Perimeter' | 'Area' | 'Radius' | 'Volume' | 'FreeText' | 'HandWrittenSignature' | 'Initial' | 'Ink' | 'Stamp' | 'Image' | 'StickyNotes';
/**
 * Enum LineHeadStyle for line and arrow annotation
 */
export declare type LineHeadStyle = 'None' | 'Closed' | 'Open' | 'Square' | 'Round' | 'Diamond' | 'Butt';
/**
 * Enum unit for calibration annotation
 */
export declare type CalibrationUnit = 'pt' | 'in' | 'mm' | 'cm' | 'p' | 'ft' | 'ft_in' | 'm';
/**
 * Enum for comment status of the annotation
 */
export declare enum CommentStatus {
    None = 1,
    Accepted = 2,
    Canceled = 3,
    Completed = 4,
    Rejected = 5
}
/**
 * Enum unit for ContextMenu Actions
 */
export declare type ContextMenuAction = 'None' | 'MouseUp' | 'RightClick';
/**
 * Enum unit for FormFieldType
 */
export declare type FormFieldType = 'Textbox' | 'Password' | 'CheckBox' | 'RadioButton' | 'DropDown' | 'ListBox' | 'SignatureField' | 'InitialField';
/**
 * Enum for font styles
 */
export declare enum FontStyle {
    None = 0,
    Bold = 1,
    Italic = 2,
    Underline = 4,
    Strikethrough = 8
}
/**
 * Enum for context menu items
 */
export declare enum ContextMenuItem {
    Copy = 0,
    Highlight = 1,
    Cut = 2,
    Underline = 4,
    Paste = 8,
    Delete = 16,
    ScaleRatio = 32,
    Strikethrough = 64,
    Properties = 128,
    Comment = 256
}
/**
 * Enum for signature type
 */
export declare enum SignatureType {
    Draw = "Draw",
    Type = "Type",
    Image = "Image"
}
/**
 * Enum unit for text alignment
 */
export declare type TextAlignment = 'Left' | 'Right' | 'Center' | 'Justify';
/**
 * Enum unit for Visibility
 */
export declare type Visibility = 'visible' | 'hidden';
/**
 * Enum for annotation selector shapes
 */
export declare type AnnotationResizerShape = 'Square' | 'Circle';
/**
 * Enum for annotation resizer location
 */
export declare enum AnnotationResizerLocation {
    Corners = 1,
    Edges = 2
}
/**
 * Enum for displaying the signature dialog
 */
export declare enum DisplayMode {
    /** Draw - Display only the draw option in the signature dialog. */
    Draw = 1,
    /** Text - Display only the type option in the signature dialog. */
    Text = 2,
    /** Upload - Display only the upload option in the signature dialog. */
    Upload = 4
}
/**
 * set the ZoomMode on rendering
 */
export declare type ZoomMode = 'Default' | 'FitToWidth' | 'FitToPage';
/**
 * Enum for Print Mode
 */
export declare type PrintMode = 'Default' | 'NewWindow';
/**
 * Enum for cursor type
 */
export declare enum CursorType {
    auto = "auto",
    crossHair = "crosshair",
    e_resize = "e-resize",
    ew_resize = "ew-resize",
    grab = "grab",
    grabbing = "grabbing",
    move = "move",
    n_resize = "n-resize",
    ne_resize = "ne-resize",
    ns_resize = "ns-resize",
    nw_resize = "nw-resize",
    pointer = "pointer",
    s_resize = "s-resize",
    se_resize = "se-resize",
    sw_resize = "sw-resize",
    text = "text",
    w_resize = "w-resize"
}
/**
 * Enum type for Dynamic Stamp Items
 */
export declare enum DynamicStampItem {
    Revised = "Revised",
    Reviewed = "Reviewed",
    Received = "Received",
    Approved = "Approved",
    Confidential = "Confidential",
    NotApproved = "NotApproved"
}
/**
 * Enum type for Sign Stamp Items
 */
export declare enum SignStampItem {
    Witness = "Witness",
    InitialHere = "InitialHere",
    SignHere = "SignHere",
    Accepted = "Accepted",
    Rejected = "Rejected"
}
/**
 * Enum type for Standard Business Stamp Items
 */
export declare enum StandardBusinessStampItem {
    Approved = "Approved",
    NotApproved = "NotApproved",
    Draft = "Draft",
    Final = "Final",
    Completed = "Completed",
    Confidential = "Confidential",
    ForPublicRelease = "ForPublicRelease",
    NotForPublicRelease = "NotForPublicRelease",
    ForComment = "ForComment",
    Void = "Void",
    PreliminaryResults = "PreliminaryResults",
    InformationOnly = "InformationOnly"
}
/**
 * Enum type for allowed interactions for locked annotations
 */
export declare enum AllowedInteraction {
    Select = "Select",
    Move = "Move",
    Resize = "Resize",
    Delete = "Delete",
    None = "None",
    PropertyChange = "PropertyChange"
}
/**
 * Enum type for signature mode for signature fields
 */
export declare type SignatureFitMode = 'Default' | 'Stretch';
/**
 * Enum type for export annotation file types
 */
export declare enum AnnotationDataFormat {
    Json = "Json",
    Xfdf = "Xfdf"
}
/**
 * Represents the format type of form data.
 */
export declare enum FormFieldDataFormat {
    Xml = "Xml",
    Fdf = "Fdf",
    Xfdf = "Xfdf",
    Json = "Json"
}
