import { Component, L10n, Droppable } from '@syncfusion/ej2-base';
import { ModuleDeclaration, EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { DiagramModel } from './diagram-model';
import { DiagramRenderer } from './rendering/renderer';
import { PageSettingsModel, ScrollSettingsModel } from './diagram/page-settings-model';
import { DiagramElement } from './core/elements/diagram-element';
import { ServiceLocator } from './objects/service';
import { IElement, IDataLoadedEventArgs, ISelectionChangeEventArgs, IElementDrawEventArgs, IMouseWheelEventArgs, ISegmentChangeEventArgs, ILoadEventArgs } from './objects/interface/IElement';
import { IClickEventArgs, FixedUserHandleClickEventArgs } from './objects/interface/IElement';
import { UserHandleEventsArgs } from './objects/interface/IElement';
import { IKeyEventArgs } from './objects/interface/IElement';
import { ICommandExecuteEventArgs } from './objects/interface/IElement';
import { ISizeChangeEventArgs, IConnectionChangeEventArgs, IEndChangeEventArgs, IDoubleClickEventArgs } from './objects/interface/IElement';
import { ICollectionChangeEventArgs, IPropertyChangeEventArgs, IDraggingEventArgs, IRotationEventArgs } from './objects/interface/IElement';
import { ISegmentCollectionChangeEventArgs } from './objects/interface/IElement';
import { IDragEnterEventArgs, IDragLeaveEventArgs, IDragOverEventArgs, IDropEventArgs } from './objects/interface/IElement';
import { ITextEditEventArgs, IHistoryChangeArgs, IScrollChangeEventArgs } from './objects/interface/IElement';
import { IMouseEventArgs } from './objects/interface/IElement';
import { IBlazorCustomHistoryChangeArgs, IImageLoadEventArgs } from './objects/interface/IElement';
import { IExpandStateChangeEventArgs } from './objects/interface/IElement';
import { ZoomOptions, IPrintOptions, IExportOptions, IFitOptions, ActiveLabel } from './objects/interface/interfaces';
import { View } from './objects/interface/interfaces';
import { Container } from './core/containers/container';
import { Node } from './objects/node';
import { Connector } from './objects/connector';
import { ConnectorModel } from './objects/connector-model';
import { RulerSettingsModel } from './diagram/ruler-settings-model';
import { SnapSettingsModel } from './diagram/grid-lines-model';
import { NodeModel, BpmnAnnotationModel } from './objects/node-model';
import { LaneModel, PhaseModel } from './objects/node-model';
import { DiagramTools, AlignmentMode, ScrollActions } from './enum/enum';
import { BlazorAction } from './enum/enum';
import { DiagramConstraints, BridgeDirection, AlignmentOptions, PortVisibility, DiagramEvent } from './enum/enum';
import { DistributeOptions, SizingOptions, RenderingMode, DiagramAction, NudgeDirection } from './enum/enum';
import { RealAction, HistoryChangeAction } from './enum/enum';
import { Rect } from './primitives/rect';
import { PointPortModel } from './objects/port-model';
import { ShapeAnnotationModel, AnnotationModel, PathAnnotationModel } from './objects/annotation-model';
import { ShapeAnnotation, PathAnnotation } from './objects/annotation';
import { PointModel } from './primitives/point-model';
import { GridPanel } from './core/containers/grid';
import { DataSourceModel } from './diagram/data-source-model';
import { LayoutModel } from './layout/layout-base-model';
import { ILayout } from './layout/layout-base';
import { DataBinding } from './data-binding/data-binding';
import { Selector } from './objects/node';
import { SelectorModel } from './objects/node-model';
import { CommandHandler } from './interaction/command-manager';
import { DiagramScroller } from './interaction/scroller';
import { Actions } from './interaction/actions';
import { ToolBase } from './interaction/tool';
import { BpmnDiagrams } from './objects/bpmn';
import { DiagramContextMenu } from './objects/context-menu';
import { ConnectorBridging } from './objects/connector-bridging';
import { SpatialSearch } from './interaction/spatial-search/spatial-search';
import { HistoryEntry, History } from './diagram/history';
import { UndoRedo } from './objects/undo-redo';
import { ConnectorEditing } from './interaction/connector-editing';
import { Ruler } from '../ruler/index';
import { BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { CommandManagerModel, ContextMenuSettingsModel } from './diagram/keyboard-commands-model';
import { Snapping } from './objects/snapping';
import { DiagramTooltipModel } from './objects/tooltip-model';
import { ShadowModel } from './core/appearance-model';
import { RadialTree } from './layout/radial-tree';
import { HierarchicalTree } from './layout/hierarchical-tree';
import { ComplexHierarchicalTree } from './layout/complex-hierarchical-tree';
import { MindMap } from './layout/mind-map';
import { Tooltip } from '@syncfusion/ej2-popups';
import { PrintAndExport } from './print-settings';
import { SymmetricLayout } from './layout/symmetrical-layout';
import { LayoutAnimation } from './objects/layout-animation';
import { LayerModel } from './diagram/layer-model';
import { SerializationSettingsModel } from './diagram/serialization-settings-model';
import { CustomCursorActionModel } from './diagram/custom-cursor-model';
import { LineRouting } from './interaction/line-routing';
import { LineDistribution } from './interaction/line-distribution';
import { DiagramSettingsModel } from '../diagram/diagram-settings-model';
import { BlazorTooltip } from './blazor-tooltip/blazor-Tooltip';
import { NodeFixedUserHandleModel, ConnectorFixedUserHandleModel } from './objects/fixed-user-handle-model';
import { SegmentThumbShapes } from './enum/enum';
import { EJ1SerializationModule } from './load-utility/modelProperties';
/**
 * Represents the Diagram control
 * ```html
 * <div id='diagram'/>
 * ```
 * ```typescript
 * let diagram: Diagram = new Diagram({
 * width:'1000px', height:'500px' });
 * diagram.appendTo('#diagram');
 * ```
 */
export declare class Diagram extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * `organizationalChartModule` is used to arrange the nodes in a organizational chart like struture
     *
     * @private
     */
    organizationalChartModule: HierarchicalTree;
    /**
     * `mindMapChartModule` is used to arrange the nodes in a mind map like structure
     *
     */
    mindMapChartModule: MindMap;
    /**
     * `radialTreeModule` is used to arrange the nodes in a radial tree like structure
     *
     * @ignoreapilink
     */
    radialTreeModule: RadialTree;
    /**
     * `complexHierarchicalTreeModule` is used to arrange the nodes in a hierarchical tree like structure
     *
     * @private
     */
    complexHierarchicalTreeModule: ComplexHierarchicalTree;
    /**
     * `dataBindingModule` is used to populate nodes from given data source
     *
     * @private
     */
    dataBindingModule: DataBinding;
    /**
     * `snappingModule` is used to Snap the objects
     *
     * @private
     */
    snappingModule: Snapping;
    /**
     * `modelProperties` is used to Snap the objects
     *
     * @private
     */
    modelProperties: EJ1SerializationModule;
    /**
     * `printandExportModule` is used to print or export the objects
     *
     * @private
     */
    printandExportModule: PrintAndExport;
    /**
     * `tooltipBlazorModule` is used to render tooltip
     *
     * @private
     */
    blazorTooltipModule: BlazorTooltip;
    /**
     * `bpmnModule` is used to add built-in BPMN Shapes to diagrams
     *
     * @private
     */
    bpmnModule: BpmnDiagrams;
    /**
     * 'symmetricalLayoutModule' is usd to render layout in symmetrical method
     *
     * @private
     */
    symmetricalLayoutModule: SymmetricLayout;
    /**
     * `bridgingModule` is used to add bridges to connectors
     *
     * @private
     */
    bridgingModule: ConnectorBridging;
    /**
     * `undoRedoModule` is used to revert and restore the changes
     *
     * @private
     */
    undoRedoModule: UndoRedo;
    /**
     * `layoutAnimateModule` is used to revert and restore the changes
     *
     * @private
     */
    layoutAnimateModule: LayoutAnimation;
    /**
     * 'contextMenuModule' is used to manipulate context menu
     *
     * @private
     */
    contextMenuModule: DiagramContextMenu;
    /**
     * `connectorEditingToolModule` is used to edit the segments for connector
     *
     * @private
     */
    connectorEditingToolModule: ConnectorEditing;
    /**
     * `lineRoutingModule` is used to connect the node's without overlapping
     *
     * @private
     */
    lineRoutingModule: LineRouting;
    /**
     * `lineDistributionModule` is used to connect the node's without overlapping in automatic layout
     *
     */
    lineDistributionModule: LineDistribution;
    /**
     * Defines the width of the diagram model.
     * ```html
     * <div id='diagram'/>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * width:'1000px', height:'500px' });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default '100%'
     */
    width: string | number;
    /**
     * Split the connector, when the node is dropped onto it and establish connection with that dropped node.
     *
     * @default false
     */
    enableConnectorSplit: boolean;
    /**
     * Defines the diagram rendering mode.
     * * SVG - Renders the diagram objects as SVG elements
     * * Canvas - Renders the diagram in a canvas
     *
     * @default 'SVG'
     */
    mode: RenderingMode;
    /**
     * Defines the height of the diagram model.
     *
     * @default '100%'
     */
    height: string | number;
    /**
     * Defines the segmentThumbShape
     *
     * @default 'Rhombus'
     */
    segmentThumbShape: SegmentThumbShapes;
    /**
     * Defines type of menu that appears when you perform right-click operation
     * An object to customize the context menu of diagram
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * ...
     *   contextMenuSettings: { show: true },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     */
    contextMenuSettings: ContextMenuSettingsModel;
    /**
     * Constraints are used to enable/disable certain behaviors of the diagram.
     * * None - Disables DiagramConstraints constraints
     * * Bridging - Enables/Disables Bridging support for connector
     * * UndoRedo - Enables/Disables the Undo/Redo support
     * * Tooltip - Enables/Disables Tooltip support
     * * UserInteraction - Enables/Disables editing diagram interactively
     * * ApiUpdate - Enables/Disables editing diagram through code
     * * PageEditable - Enables/Disables editing diagrams both interactively and through code
     * * Zoom - Enables/Disables Zoom support for the diagram
     * * PanX - Enables/Disable PanX support for the diagram
     * * PanY - Enables/Disable PanY support for the diagram
     * * Pan - Enables/Disable Pan support the diagram
     *
     * @default 'Default'
     * @aspNumberEnum
     */
    constraints: DiagramConstraints;
    /**
     * Defines the precedence of the interactive tools. They are,
     * * None - Disables selection, zooming and drawing tools
     * * SingleSelect - Enables/Disables single select support for the diagram
     * * MultipleSelect - Enables/Disable MultipleSelect select support for the diagram
     * * ZoomPan - Enables/Disable ZoomPan support for the diagram
     * * DrawOnce - Enables/Disable ContinuousDraw support for the diagram
     * * ContinuousDraw - Enables/Disable ContinuousDraw support for the diagram
     *
     * @default 'Default'
     * @aspNumberEnum

     */
    tool: DiagramTools;
    /**
     * Defines the direction of the bridge that is inserted when the segments are intersected
     * * Top - Defines the direction of the bridge as Top
     * * Bottom - Defines the direction of the bridge as Bottom
     * * Left - Sets the bridge direction as left
     * * Right - Sets the bridge direction as right
     *
     * @default top
     */
    bridgeDirection: BridgeDirection;
    /**
     * Defines the background color of the diagram
     *
     * @default 'transparent'
     */
    backgroundColor: string;
    /**
     * Defines the gridlines and defines how and when the objects have to be snapped
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let horizontalGridlines: GridlinesModel = {lineColor: 'black', lineDashArray: '1,1' };
     * let verticalGridlines: GridlinesModel = {lineColor: 'black', lineDashArray: '1,1'};
     * let diagram: Diagram = new Diagram({
     * ...
     * snapSettings: { horizontalGridlines, verticalGridlines, constraints: SnapConstraints.ShowLines,
     * snapObjectDistance: 5, snapAngle: 5 },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default {}
     */
    snapSettings: SnapSettingsModel;
    /**
     * Defines the properties of both horizontal and vertical guides/rulers to measure the diagram area.
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let arrange: Function = (args: IArrangeTickOptions) => {
     * if (args.tickInterval % 10 == 0) {
     * args.tickLength = 25;
     * }
     * }
     * let diagram: Diagram = new Diagram({
     * ...
     * rulerSettings: { showRulers: true,
     * horizontalRuler: { segmentWidth: 50, orientation: 'Horizontal', interval: 10,  arrangeTick: arrange },
     * verticalRuler: {segmentWidth: 200,interval: 20, thickness: 20,
     * tickAlignment: 'LeftOrTop', segmentWidth: 50, markerColor: 'red' }
     * },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default {}
     */
    rulerSettings: RulerSettingsModel;
    /**
     * Page settings enable to customize the appearance, width, and height of the Diagram page.
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * ...
     * pageSettings: {  width: 800, height: 600, orientation: 'Landscape',
     * background: { color: 'blue' }, boundaryConstraints: 'Infinity'},
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default {}
     */
    pageSettings: PageSettingsModel;
    /**
     * Defines the serialization settings of diagram.
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * ...
     * serializationSettings: { preventDefaults: true },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default {}
     */
    serializationSettings: SerializationSettingsModel;
    /**
     * Defines the collection of nodes
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let nodes: NodeModel[] = [{
     *           id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100,
     *           annotations: [{ content: 'Default Shape' }]
     *       },
     *       {
     *           id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100,
     *           shape: {
     *               type: 'Basic', shape: 'Ellipse'
     *           },
     *           annotations: [{ content: 'Path Element' }]
     *       }
     *       ];
     * let diagram: Diagram = new Diagram({
     * ...
     * nodes: nodes,
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    nodes: NodeModel[];
    /**
     * Defines the object to be drawn using drawing tool
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * ...
     * drawingObject : {id: 'connector3', type: 'Straight'},
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    drawingObject: NodeModel | ConnectorModel;
    /**
     * Defines a collection of objects, used to create link between two points, nodes or ports to represent the relationships between them
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     *       let connectors: ConnectorModel[] = [{
     *           id: 'connector1',
     *           type: 'Straight',
     *           sourcePoint: { x: 100, y: 300 },
     *           targetPoint: { x: 200, y: 400 },
     *       }];
     * let diagram: Diagram = new Diagram({
     * ...
     *       connectors: connectors,
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default []
     */
    connectors: ConnectorModel[];
    /**
     * Defines the basic elements for the diagram
     *
     * @default []
     * @hidden
     */
    basicElements: DiagramElement[];
    /**
     * Defines the tooltip that should be shown when the mouse hovers over a node or connector
     * An object that defines the description, appearance and alignments of tooltip
     *
     * @default {}
     */
    tooltip: DiagramTooltipModel;
    /**
     * Configures the data source that is to be bound with diagram
     *
     * @default {}
     */
    dataSourceSettings: DataSourceModel;
    /**
     * Allows the user to save custom information/data about diagram
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    addInfo: Object;
    /**
     * Customizes the undo redo functionality
     *
     * @default undefined
     */
    historyManager: History;
    /**
     * Customizes the node template
     *
     * @default undefined
     * @aspType string
     */
    nodeTemplate: string | Function;
    /**
     * Customizes the annotation template
     *
     * @default undefined
     * @aspType string
     */
    annotationTemplate: string | Function;
    /**
     * This property represents the template content of a user handle. The user can define any HTML element as a template.
     *
     * @default undefined
     * @aspType string
     */
    userHandleTemplate: string | Function;
    /**
     * Helps to return the default properties of node
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let nodes: NodeModel[] = [{
     *           id: 'node1', height: 100, offsetX: 100, offsetY: 100,
     *           annotations: [{ content: 'Default Shape' }]
     *       },
     *       {
     *           id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100,
     *           shape: {
     *               type: 'Basic', shape: 'Ellipse'
     *           },
     *           annotations: [{ content: 'Ellipse' }]
     *       }
     *       ];
     * let diagram: Diagram = new Diagram({
     * ...
     * nodes: nodes,
     * getNodeDefaults: (node: NodeModel) => {
     *   let obj: NodeModel = {};
     *   if (obj.width === undefined) {
     *       obj.width = 145;
     *   }
     *   obj.style = { fill: '#357BD2', strokeColor: 'white' };
     *   obj.annotations = [{ style: { color: 'white', fill: 'transparent' } }];
     *   return obj;
     *    },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined

     */
    getNodeDefaults: Function | string;
    /**
     * Helps to assign the default properties of nodes
     */
    nodeDefaults: NodeModel;
    /**
     * Helps to return the default properties of connector
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     *       let connectors: ConnectorModel[] = [{
     *           id: 'connector1',
     *           sourcePoint: { x: 100, y: 300 },
     *           targetPoint: { x: 200, y: 400 },
     *       }];
     * let diagram: Diagram = new Diagram({
     * ...
     *   connectors: connectors,
     *   getConnectorDefaults: (connector: ConnectorModel, diagram: Diagram) => {
     *   let connObj: ConnectorModel = {};
     *   connObj.targetDecorator ={ shape :'None' };
     *   connObj.type = 'Orthogonal';
     *   return connObj;
     *   },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined

     */
    getConnectorDefaults: Function | string;
    /**
     * Helps to assign the default properties of connector
     */
    connectorDefaults: ConnectorModel;
    /**
     * setNodeTemplate helps to customize the content of a node
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let getTextElement: Function = (text: string) => {
     * let textElement: TextElement = new TextElement();
     * textElement.width = 50;
     * textElement.height = 20;
     * textElement.content = text;
     * return textElement;
     * };
     * let nodes: NodeModel[] = [{
     *           id: 'node1', height: 100, offsetX: 100, offsetY: 100,
     *           annotations: [{ content: 'Default Shape' }]
     *       },
     *       {
     *           id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100
     *       }
     *       ];
     * let diagram: Diagram = new Diagram({
     * ...
     * nodes: nodes,
     * setNodeTemplate : setNodeTemplate,
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     * function setNodeTemplate() {
     * setNodeTemplate: (obj: NodeModel, diagram: Diagram): StackPanel => {
     *   if (obj.id === 'node2') {
     *       let table: StackPanel = new StackPanel();
     *       table.orientation = 'Horizontal';
     *       let column1: StackPanel = new StackPanel();
     *       column1.children = [];
     *       column1.children.push(getTextElement('Column1'));
     *       addRows(column1);
     *       let column2: StackPanel = new StackPanel();
     *       column2.children = [];
     *       column2.children.push(getTextElement('Column2'));
     *       addRows(column2);
     *       table.children = [column1, column2];
     *       return table;
     *   }
     *   return null;
     *   }
     * ...
     * }
     *
     * @aspDefaultValueIgnore
     * @default undefined

     */
    setNodeTemplate: Function | string;
    /**
     * Allows to set accessibility content for diagram objects
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    /**
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let connector1: ConnectorModel = {
     *          id: 'connector1', type: 'Straight',
     *          sourcePoint: { x: 100, y: 100 },targetPoint: { x: 200, y: 200 },
     *          annotations: [{ 'content': 'label', 'offset': 0, 'alignment': 'Center' }]
     *       };
     * let connector2: ConnectorModel = {
     *           id: 'connector2', type: 'Straight',
     *           sourcePoint: { x: 400, y: 400 }, targetPoint: { x: 600, y: 600 },
     *       };
     * let diagram: Diagram;
     * diagram = new Diagram({
     * width: 1000, height: 1000,
     * connectors: [connector1, connector2],
     * snapSettings: { constraints: SnapConstraints.ShowLines },
     * getDescription: getAccessibility
     * });
     * diagram.appendTo('#diagram');
     * function getAccessibility(obj: ConnectorModel, diagram: Diagram): string {
     * let value: string;
     * if (obj instanceof Connector) {
     * value = 'clicked on Connector';
     * } else if (obj instanceof TextElement) {
     * value = 'clicked on annotation';
     * }
     * else if (obj instanceof Decorator) {
     * value = 'clicked on Decorator';
     * }
     * else { value = undefined; }
     * return value;
     * }
     * ```
     *

     */
    getDescription: Function | string;
    /**
     * Allows to get the custom properties that have to be serialized
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let nodes: NodeModel[] = [{
     *           id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100,
     *           annotations: [{ content: 'Default Shape' }]
     *       },
     *       {
     *           id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100,
     *           shape: { type: 'Basic', shape: 'Ellipse' },
     *           annotations: [{ content: 'Path Element' }]
     *       }
     *       ];
     *       let connectors: ConnectorModel[] = [{
     *           id: 'connector1', type: 'Straight',
     *           sourcePoint: { x: 100, y: 300 }, targetPoint: { x: 200, y: 400 },
     *       }];
     * let diagram: Diagram = new Diagram({
     * ...
     * connectors: connectors, nodes: nodes,
     * getCustomProperty: (key: string) => {
     * if (key === 'nodes') {
     * return ['description'];
     * }
     *         return null;
     * }
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined

     */
    getCustomProperty: Function | string;
    /**
     * Allows the user to set custom tool that corresponds to the given action
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    /**
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * function getTool(action: string): ToolBase {
     * let tool: ToolBase;
     * if (action === 'userHandle1') {
     * tool = new CloneTool(diagram.commandHandler, true);
     * }
     * return tool;
     * }
     * class CloneTool extends ToolBase {
     * public mouseDown(args: MouseEventArgs): void {
     * super.mouseDown(args);
     * diagram.copy();
     * diagram.paste();
     * }
     * }
     * let nodes: NodeModel[] = [{
     *           id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100,
     *       },
     *       {
     *           id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100,
     *           shape: { type: 'Basic', shape: 'Ellipse' },
     *       }];
     *       let connectors: ConnectorModel[] = [{
     *           id: 'connector1', type: 'Straight',
     *           sourcePoint: { x: 100, y: 300 }, targetPoint: { x: 200, y: 400 },
     *       }];
     *      let handles: UserHandleModel[] = [
     *          { name: 'handle', margin: { top: 0, bottom: 0, left: 0, right: 0 }, offset: 0,
     *            pathData: 'M 376.892,225.284L 371.279,211.95L 376.892,198.617L 350.225,211.95L 376.892,225.284 Z',
     *            side: 'Top', horizontalAlignment: 'Center', verticalAlignment: 'Center',
     *            pathColor: 'yellow' }];
     * let diagram: Diagram = new Diagram({
     * ...
     *     connectors: connectors, nodes: nodes,
     *     selectedItems: { constraints: SelectorConstraints.All, userHandles: handles },
     *     getCustomTool: getTool
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *

     */
    getCustomTool: Function | string;
    /**
     * Allows the user to set custom cursor that corresponds to the given action
     *
     * @aspDefaultValueIgnore
     * @default undefined
     */
    /**
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * function getCursor(action: string, active: boolean): string {
     * let cursor: string;
     * if (active && action === 'Drag') {
     * cursor = '-webkit-grabbing';
     * } else if (action === 'Drag') {
     * cursor = '-webkit-grab'
     * }
     * return cursor;
     * }
     * let nodes: NodeModel[] = [{
     *           id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100,
     *       },
     *       {
     *           id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100,
     *           shape: { type: 'Basic', shape: 'Ellipse' },
     *       }];
     * let handle: UserHandleModel[] = [
     * { name: 'handle', margin: { top: 0, bottom: 0, left: 0, right: 0 }, offset: 0,
     * pathData: 'M 376.892,225.284L 371.279,211.95L 376.892,198.617L 350.225,211.95L 376.892,225.284 Z',
     * side: 'Top', horizontalAlignment: 'Center', verticalAlignment: 'Center',
     * pathColor: 'yellow' }];
     * let diagram: Diagram = new Diagram({
     * ...
     *     nodes: nodes,
     *     selectedItems: { constraints: SelectorConstraints.All, userHandles: handle },
     *     getCustomCursor: getCursor
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *

     */
    getCustomCursor: Function | string;
    /**
     * A collection of JSON objects where each object represents a custom cursor action. Layer is a named category of diagram shapes.
     *
     * @default []
     */
    customCursor: CustomCursorActionModel[];
    /**
     * Helps to set the undo and redo node selection
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     *       let connectors: ConnectorModel[] = [{
     *           id: 'connector1',
     *           sourcePoint: { x: 100, y: 300 },
     *           targetPoint: { x: 200, y: 400 },
     *       }];
     * let diagram: Diagram = new Diagram({
     * ...
     *   connectors: connectors,
     *   updateSelection: (object: ConnectorModel | NodeModel, diagram: Diagram) => {
     *   let objectCollection = [];
     *   objectCollection.push(obejct);
     *   diagram.select(objectCollection);
     *   },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @aspDefaultValueIgnore
     * @default undefined

     */
    updateSelection: Function | string;
    /**
     * Represents the diagram settings
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * ...
     * diagramSettings: { inversedAlignment: true  }
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```
     *
     * @default {}
     */
    diagramSettings: DiagramSettingsModel;
    /** @private */
    version: number;
    /**
     * Defines the collection of selected items, size and position of the selector
     *
     * @default {}
     */
    selectedItems: SelectorModel;
    /**
     * Defines the current zoom value, zoom factor, scroll status and view port size of the diagram
     *
     * @default {}
     */
    scrollSettings: ScrollSettingsModel;
    /**
     * Layout is used to auto-arrange the nodes in the Diagram area
     *
     * @default {}
     */
    layout: LayoutModel;
    /**
     * Defines a set of custom commands and binds them with a set of desired key gestures
     *
     * @default {}
     */
    commandManager: CommandManagerModel;
    /**
     * Triggers after diagram is populated from the external data source
     *
     * @event

     */
    dataLoaded: EmitType<IDataLoadedEventArgs>;
    /**
     * Triggers when a symbol is dragged into diagram from symbol palette
     *
     * @event
     */
    dragEnter: EmitType<IDragEnterEventArgs>;
    /**
     * Triggers when a symbol is dragged outside of the diagram.
     *
     * @event
     */
    dragLeave: EmitType<IDragLeaveEventArgs>;
    /**
     * Triggers when a symbol is dragged over diagram
     *
     * @event

     */
    dragOver: EmitType<IDragOverEventArgs>;
    /**
     * Triggers when a node, connector or diagram is clicked
     *
     * @event
     */
    click: EmitType<IClickEventArgs>;
    /**
     * Triggers when a change is reverted or restored(undo/redo)
     *
     * @event
     */
    historyChange: EmitType<IHistoryChangeArgs>;
    /**
     * Triggers when a custom entry change is reverted or restored(undo/redo)
     *
     * @event
     */
    historyStateChange: EmitType<IBlazorCustomHistoryChangeArgs>;
    /**
     * Triggers when a node, connector or diagram model is clicked twice
     *
     * @event
     */
    doubleClick: EmitType<IDoubleClickEventArgs>;
    /**
     * Triggers when editor got focus at the time of node’s label or text node editing.
     *
     * @event
     */
    textEdit: EmitType<ITextEditEventArgs>;
    /**
     * Triggers when the diagram is zoomed or panned
     *
     * @event

     */
    scrollChange: EmitType<IScrollChangeEventArgs>;
    /**
     * Event triggers whenever the user rotate the mouse wheel either upwards or downwards
     *
     * @event
    */
    mouseWheel: EmitType<IMouseWheelEventArgs>;
    /**
     * Triggers when the selection is changed in diagram
     *
     * @event
     */
    selectionChange: EmitType<ISelectionChangeEventArgs>;
    /**
     * Triggers when a node is resized
     *
     * @event
     */
    sizeChange: EmitType<ISizeChangeEventArgs>;
    /**
     * Triggers when the connection is changed
     *
     * @event
     */
    connectionChange: EmitType<IConnectionChangeEventArgs>;
    /**
     * Triggers when the connector's source point is changed
     *
     * @event

     */
    sourcePointChange: EmitType<IEndChangeEventArgs>;
    /**
     * Triggers when the connector's target point is changed
     *
     * @event

     */
    targetPointChange: EmitType<IEndChangeEventArgs>;
    /**
     * Triggers once the node or connector property changed.
     *
     * @event
     */
    propertyChange: EmitType<IPropertyChangeEventArgs>;
    /**
     * Triggers while dragging the elements in diagram
     *
     * @event
     */
    positionChange: EmitType<IDraggingEventArgs>;
    /**
     * Triggers when a user releases a key.
     *
     * @event
     */
    keyUp: EmitType<IKeyEventArgs>;
    /**
     * Triggers when a user is pressing a key.
     *
     * @event
     */
    keyDown: EmitType<IKeyEventArgs>;
    /**
     * Triggers after animation is completed for the diagram elements.
     *
     * @event

     */
    animationComplete: EmitType<Object>;
    /**
     * Triggers when the diagram elements are rotated
     *
     * @event
     */
    rotateChange: EmitType<IRotationEventArgs>;
    /**
     * Triggers when a node/connector is added/removed to/from the diagram.
     *

     * @event
     */
    collectionChange: EmitType<ICollectionChangeEventArgs>;
    /**
     * Triggers when a node/connector fixedUserHandle is clicked in the diagram.
     *
     * @event
     */
    fixedUserHandleClick: EmitType<FixedUserHandleClickEventArgs>;
    /**
     * Triggers when a mouseDown on the user handle.
     *
     * @event
     */
    onUserHandleMouseDown: EmitType<UserHandleEventsArgs>;
    /**
     * Triggers when a mouseUp on the user handle.
     *
     * @event
     */
    onUserHandleMouseUp: EmitType<UserHandleEventsArgs>;
    /**
     * Triggers when a mouseEnter on the user handle.
     *
     * @event
     */
    onUserHandleMouseEnter: EmitType<UserHandleEventsArgs>;
    /**
     * Triggers when a mouseLeave on the user handle.
     *
     * @event
     */
    onUserHandleMouseLeave: EmitType<UserHandleEventsArgs>;
    /**
     * Triggers when a segment is added/removed to/from the connector.
     *
     * @event

     */
    segmentCollectionChange: EmitType<ISegmentCollectionChangeEventArgs>;
    /**
     * Triggers when the image node is loaded.
     *

     * @event
     */
    onImageLoad: EmitType<IImageLoadEventArgs>;
    /**
     * Triggers when the state of the expand and collapse icon change for a node.
     *

     * @event
     */
    expandStateChange: EmitType<IExpandStateChangeEventArgs>;
    /**
     * This event triggers before the diagram load.
     *
     * @event
     */
    load: EmitType<ILoadEventArgs>;
    /**
     * Triggered when the diagram is rendered completely.
     *
     * @event
     */
    created: EmitType<Object>;
    /**
     * Triggered when mouse enters a node/connector.
     *
     * @event
     */
    mouseEnter: EmitType<IMouseEventArgs>;
    /**
     * Triggered when mouse leaves node/connector.
     *
     * @event
     */
    mouseLeave: EmitType<IMouseEventArgs>;
    /**
     * Triggered when mouse hovers a node/connector.
     *
     * @event

     */
    mouseOver: EmitType<IMouseEventArgs>;
    /**
     * Triggered when an element is drawn using drawing Tool
     *  @event
     */
    elementDraw: EmitType<IElementDrawEventArgs>;
    /**
     * Triggers before opening the context menu
     *
     * @event
     */
    contextMenuOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers before rendering the context menu item
     *
     * @event

     */
    contextMenuBeforeItemRender: EmitType<MenuEventArgs>;
    /**
     * Triggers when a context menu item is clicked
     *
     * @event
     */
    contextMenuClick: EmitType<MenuEventArgs>;
    /**
     * Triggers when a command executed.
     *
     * @event
     */
    commandExecute: EmitType<ICommandExecuteEventArgs>;
    /**
     * A collection of JSON objects where each object represents a layer. Layer is a named category of diagram shapes.
     *
     * @default []
     */
    layers: LayerModel[];
    /**
     * Triggers when a symbol is dragged and dropped from symbol palette to drawing area
     *
     * @event
     */
    drop: EmitType<IDropEventArgs>;
    /**
     * This event is triggered when we drag the segment thumb of Orthogonal/ Straight /Bezier connector
     *
     * @event

     */
    segmentChange: EmitType<ISegmentChangeEventArgs>;
    /** @private */
    preventDiagramUpdate: boolean;
    /** @private */
    checkMenu: boolean;
    /** @private */
    parentObject: NodeModel;
    /** @hidden */
    /** @private */
    localeObj: L10n;
    private defaultLocale;
    /** @private */
    isServerUpdate: boolean;
    /** @private */
    currentDrawingObject: Node | Connector;
    /** @private */
    currentSymbol: Node | Connector;
    /** @private */
    oldNodeObjects: Node[];
    /** @private */
    oldDiagramObject: object;
    /** @private */
    oldConnectorObjects: Connector[];
    /** @private */
    diagramRenderer: DiagramRenderer;
    private gridlineSvgLayer;
    private renderer;
    /** @private */
    tooltipObject: Tooltip | BlazorTooltip;
    /** @private */
    hRuler: Ruler;
    /** @private */
    vRuler: Ruler;
    /** @private */
    droppable: Droppable;
    /** @private */
    diagramCanvas: HTMLElement;
    /** @private */
    diagramLayer: HTMLCanvasElement | SVGGElement;
    private diagramLayerDiv;
    private adornerLayer;
    private eventHandler;
    /** @private */
    scroller: DiagramScroller;
    /** @private */
    spatialSearch: SpatialSearch;
    /** @private */
    commandHandler: CommandHandler;
    /** @private */
    layerZIndex: number;
    /** @private */
    layerZIndexTable: {};
    /** @private */
    nameTable: {};
    /** @private */
    canEnableBlazorObject: boolean;
    /** @private */
    pathTable: {};
    /** @private */
    connectorTable: {};
    /** @private */
    groupTable: {};
    /** @private */
    private htmlLayer;
    /** @private */
    diagramActions: DiagramAction;
    /** @private */
    scrollActions: ScrollActions;
    /** @private */
    blazorActions: BlazorAction;
    /** @private */
    commands: {};
    /** @private */
    activeLabel: ActiveLabel;
    /** @private */
    activeLayer: LayerModel;
    /** @private */
    serviceLocator: ServiceLocator;
    /** @private */
    views: string[];
    /** @private */
    isLoading: Boolean;
    /** @private */
    textEditing: Boolean;
    /** @private */
    isTriggerEvent: Boolean;
    /** @private */
    preventNodesUpdate: Boolean;
    /** @private */
    preventConnectorsUpdate: Boolean;
    /** @private */
    callBlazorModel: Boolean;
    /** @private */
    selectionConnectorsList: ConnectorModel[];
    /** @private */
    deleteVirtualObject: boolean;
    /** @private */
    realActions: RealAction;
    /** @private */
    previousSelectedObject: (NodeModel | ConnectorModel)[];
    canLayout: boolean;
    private isRefreshed;
    /** @private */
    swimlaneChildTable: {};
    /** @private */
    swimlaneZIndexTable: {};
    /** @private */
    canExpand: boolean;
    private changedConnectorCollection;
    private changedNodesCollection;
    private previousNodeCollection;
    private previousConnectorCollection;
    private crudDeleteNodes;
    private previousSelectedObjects;
    private blazorAddorRemoveCollection;
    private blazorRemoveIndexCollection;
    private diagramid;
    /** @private */
    selectedObject: {
        helperObject: NodeModel;
        actualObject: NodeModel;
    };
    /**
     * Constructor for creating the widget
     */
    constructor(options?: DiagramModel, element?: HTMLElement | string);
    private updateAnnotationText;
    private callFromServer;
    private clearCollection;
    /**
     * Updates the diagram control when the objects are changed
     *
     * @param {DiagramModel} newProp - Lists the new values of the changed properties
     * @param {DiagramModel} oldProp - Lists the old values of the changed properties
     */
    onPropertyChanged(newProp: DiagramModel, oldProp: DiagramModel): void;
    private updateSnapSettings;
    private updateGradient;
    private updateRulerSettings;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string}
     */
    getPersistData(): string;
    /**
     * Initialize nodes, connectors and renderer
     */
    protected preRender(): void;
    private initializePrivateVariables;
    private initializeServices;
    /**
     * Method to set culture for chart
     */
    private setCulture;
    /**
     * Renders the diagram control with nodes and connectors
     */
    render(): void;
    private updateFitToPage;
    private updateTemplate;
    private resetTemplate;
    private renderInitialCrud;
    /**
     * Returns the module name of the diagram
     *
     * @returns {string}  Returns the module name of the diagram
     */
    getModuleName(): string;
    /**
     *
     * Returns the name of class Diagram
     * @returns {string}  Returns the module name of the diagram
     * @private
     */
    getClassName(): string;
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} To provide the array of modules needed for control rendering .\
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    private removeUserHandlesTemplate;
    /**
     *To destroy the diagram
     *
     * @returns {void} To destroy the diagram
     */
    destroy(): void;
    private wireEvents;
    private unWireEvents;
    /**
     * Selects the given collection of objects \
     *
     * @returns { void } Selects the given collection of objects .\
     * @param {NodeModel | ConnectorModel} objects - Defines the collection of nodes and connectors to be selected
     * @param {boolean} multipleSelection -Defines whether the existing selection has to be cleared or not
     * @param {NodeModel | ConnectorModel} oldValue - Defines the old value
     *
     */
    select(objects: (NodeModel | ConnectorModel)[], multipleSelection?: boolean, oldValue?: (NodeModel | ConnectorModel)[]): void;
    /**
    * this method returns diagramAction as a string
    * @returns { string }
    */
    getDiagramAction(diagramAction: DiagramAction): string;
    /**
     *  Selects the all the objects. \
     *
     * @returns { void }  Selects the all the objects. .\
     *
     */
    selectAll(): void;
    /**
     * Removes the given object from selection list \
     *
     * @returns { void } Selects the given collection of objects .\
     * @param {NodeModel | ConnectorModel} obj -  Removes the given object from selection list
     *
     */
    unSelect(obj: NodeModel | ConnectorModel): void;
    /**
     * Removes all elements from the selection list\
     *
     * @returns { void } Removes all elements from the selection list .\
     *
     */
    clearSelection(): void;
    /**
     *  Update the diagram clipboard dimension \
     *
     * @returns { void }  Update the diagram clipboard dimension .\
     *
     */
    updateViewPort(): void;
    private cutCommand;
    /**
     *  Removes the selected nodes and connectors from diagram and moves them to diagram clipboard \
     *
     * @returns { void }  Removes the selected nodes and connectors from diagram and moves them to diagram clipboard .\
     *
     */
    cut(): void;
    /**
     *   Add a process into the sub-process \
     *
     * @returns { void }  Add a process into the sub-process.\
     * @param {NodeModel | ConnectorModel} process - provide the process value.
     * @param {boolean} parentId - provide the parentId value.
     *
     */
    addProcess(process: NodeModel, parentId: string): void;
    /**
     *  Remove a process from the sub-processs \
     *
     * @returns { void }  Remove a process from the sub-process.\
     * @param {string} id - provide the id value.
     *
     */
    removeProcess(id: string): void;
    private pasteCommand;
    /**
     *  Adds the given objects/ the objects in the diagram clipboard to diagram control \
     *
     * @returns { void }  Remove a process from the sub-process.\
     * @param {NodeModel[] | ConnectorModel[]} obj - Defines the objects to be added to diagram

     *
     */
    paste(obj?: (NodeModel | ConnectorModel)[]): void;
    /**
     *  fit the diagram to the page with respect to mode and region \
     *
     * @returns { void }  fit the diagram to the page with respect to mode and region.\
     * @param {IFitOptions} options - provide the options value.
     *
     */
    fitToPage(options?: IFitOptions): void;
    /**
     * bring the specified bounds into the viewport \
     *
     * @returns { void }  bring the specified bounds into the viewport.\
     * @param {Rect} bound - provide the bound value.
     *
     */
    bringIntoView(bound: Rect): void;
    /**
     * bring the specified bounds to the center of the viewport \
     *
     * @returns { void }  bring the specified bounds to the center of the viewport.\
     * @param {Rect} bound - provide the bound value.
     *
     */
    bringToCenter(bound: Rect): void;
    private copyCommand;
    /**
     * Copies the selected nodes and connectors to diagram clipboard \
     *
     * @returns { Object } Copies the selected nodes and connectors to diagram clipboard.\
     *
     */
    copy(): Object;
    /**
     *  Group the selected nodes and connectors in diagram \
     *
     * @returns { void }   Group the selected nodes and connectors in diagram.\
     *
     */
    group(): void;
    /**
     *  UnGroup the selected nodes and connectors in diagram \
     *
     * @returns { void }   UnGroup the selected nodes and connectors in diagram.\
     *
     */
    unGroup(): void;
    /**
     *  send the selected nodes or connectors back \
     *
     * @returns { void }   send the selected nodes or connectors back.\
     *
     */
    sendToBack(): void;
    /**
     * set the active layer\
     *
     * @returns { void } set the active layer.\
     * @param {string} layerName - defines the name of the layer which is to be active layer.
     *
     */
    setActiveLayer(layerName: string): void;
    /**
     * add the layer into diagram\
     *
     * @returns { void } add the layer into diagram.\
     * @param {LayerModel} layer - defines the layer model which is to be added
     * @param {Object[]} layerObject - defines the object of the layer
     * @blazorArgsType layer|DiagramLayer

     *
     */
    addLayer(layer: LayerModel, layerObject?: Object[]): void;
    /**
     *  @private
     */
    private addDiagramLayer;
    /**
     * remove the layer from diagram \
     *
     * @returns { void } remove the layer from diagram.\
     * @param {string} layerId - provide the bound value.

     *
     */
    removeLayer(layerId: string): void;
    /**
     *  @private
     */
    private removeDiagramLayer;
    /**
     * move objects from the layer to another layer from diagram\
     *
     * @returns { void } move objects from the layer to another layer from diagram.\
     * @param {string[]} objects - define the objects id of string array
     * @param {string} targetLayer - define the objects id of string array
     *
     */
    moveObjects(objects: string[], targetLayer?: string): void;
    private layerObjectUpdate;
    /**
     * move the layer backward \
     *
     * @returns { void } move the layer backward .\
     * @param {string} layerName - define the name of the layer
     * @param {string} targetLayer - define the objects id of string array
     *
     */
    sendLayerBackward(layerName: string): void;
    /**
     * move the layer forward \
     *
     * @returns { void } move the layer forward.\
     * @param {string} layerName - define the name of the layer
     *
     */
    bringLayerForward(layerName: string): void;
    /**
     *clone a layer with its object \
     *
     * @returns { void } move the layer forward.\
     * @param {string} layerName - define the name of the layer
     *
     */
    cloneLayer(layerName: string): void;
    /**
     *bring the selected nodes or connectors to front \
     *
     * @returns { void } move the layer forward.\
     *
     */
    bringToFront(): void;
    /**
     *send the selected nodes or connectors forward \
     *
     * @returns { void } send the selected nodes or connectors forward.\
     *
     */
    moveForward(): void;
    /**
     *send the selected nodes or connectors back\
     *
     * @returns { void } send the selected nodes or connectors back.\
     *
     */
    sendBackward(): void;
    /**
     *gets the node or connector having the given name \
     *
     * @returns { void } gets the node or connector having the given name.\
     * @param {string} name - define the name of the layer
     *
     */
    getObject(name: string): {};
    /**
     * gets the node object for the given node ID \
     *
     * @returns { void } gets the node object for the given node ID.\
     * @param {string} id - define the name of the layer
     *
     */
    getNodeObject(id: string): NodeModel;
    /**
     *gets the connector object for the given node ID \
     *
     * @returns { void } gets the connector object for the given node ID.\
     * @param {string} id - define the name of the layer
     *
     */
    getConnectorObject(id: string): ConnectorModel;
    /**
     * gets the active layer back \
     *
     * @returns { void } gets the active layer back.\
     *
     */
    getActiveLayer(): LayerModel;
    private nudgeCommand;
    /**
     * Moves the selected objects towards the given direction
     *
     * @returns { void }  Moves the selected objects towards the given direction .\
     * @param {NudgeDirection} direction -  Defines the direction by which the objects have to be moved
     * @param {number} x - Defines the distance by which the selected objects have to be horizontally moved
     * @param {number} y -  Defines the distance by which the selected objects have to be vertically moved
     */
    nudge(direction: NudgeDirection, x?: number, y?: number, type?: string): void;
    private insertBlazorDiagramObjects;
    /**
     * Drags the given object by the specified pixels
     *
     * @returns { void }  Drags the given object by the specified pixels .\
     * @param {NodeModel | ConnectorModel | SelectorModel} obj - Defines the nodes/connectors to be dragged
     * @param {number} tx - Defines the distance by which the given objects have to be horizontally moved
     * @param {number} ty - Defines the distance by which the given objects have to be vertically moved
     */
    drag(obj: NodeModel | ConnectorModel | SelectorModel, tx: number, ty: number): void;
    private disableStackContainerPadding;
    /**
     * Scales the given objects by the given ratio
     *
     * @returns { void } Scales the given objects by the given ratio .\
     * @param {NodeModel | ConnectorModel | SelectorModel} obj - Defines the objects to be resized
     * @param {number} sx - Defines the ratio by which the objects have to be horizontally scaled
     * @param {number} sy - Defines the ratio by which the objects have to be vertically scaled
     * @param {PointModel} pivot - Defines the reference point with respect to which the objects will be resized
     */
    scale(obj: NodeModel | ConnectorModel | SelectorModel, sx: number, sy: number, pivot: PointModel): boolean;
    /**
     * Rotates the given nodes/connectors by the given angle
     *
     * @returns { void } Rotates the given nodes/connectors by the given angle .\
     * @param {NodeModel | ConnectorModel | SelectorModel} obj - Defines the objects to be rotated
     * @param {number} angle - Defines the angle by which the objects have to be rotated
     * @param {PointModel} pivot - Defines the reference point with reference to which the objects have to be rotated
     */
    rotate(obj: NodeModel | ConnectorModel | SelectorModel, angle: number, pivot?: PointModel): boolean;
    /**
     * Moves the source point of the given connector
     *
     * @returns { void }  Moves the source point of the given connector .\
     * @param {ConnectorModel} obj - Defines the connector, the end points of which has to be moved
     * @param {number} tx - Defines the distance by which the end point has to be horizontally moved
     * @param {number} ty - Defines the distance by which the end point has to be vertically moved
     */
    dragSourceEnd(obj: ConnectorModel, tx: number, ty: number): void;
    /**
     * Moves the target point of the given connector
     *
     * @returns { void }   Moves the target point of the given connector.\
     * @param {ConnectorModel} obj - Defines the connector, the end points of which has to be moved
     * @param {number} tx - Defines the distance by which the end point has to be horizontally moved
     * @param {number} ty - Defines the distance by which the end point has to be vertically moved
     */
    dragTargetEnd(obj: ConnectorModel, tx: number, ty: number): void;
    /**
     * Finds all the objects that is under the given mouse position
     *
     * @returns { void }   Finds all the objects that is under the given mouse position.\
     * @param {PointModel} position - Defines the position, the objects under which has to be found
     * @param {IElement} source - Defines the object, the objects under which has to be found
     */
    findObjectsUnderMouse(position: PointModel, source?: IElement): IElement[];
    /**
     * Finds the object that is under the given mouse position
     *
     * @returns { void }   Finds the object that is under the given mouse position.\
     * @param {NodeModel[] | ConnectorModel[]}objects - Defines the collection of objects, from which the object has to be found.
     * @param {Actions} action - Defines the action, using which the relevant object has to be found.
     * @param {boolean} inAction - Defines the active state of the action.
     */
    findObjectUnderMouse(objects: (NodeModel | ConnectorModel)[], action: Actions, inAction: boolean): IElement;
    /**
     * Finds the object that is under the given active object (Source)
     *
     * @returns { void } Finds the object that is under the given active object (Source) .\
     * @param {NodeModel[] | ConnectorModel[]} objects - Defines the collection of objects, from which the object has to be found.
     * @param {Actions} action - Defines the action, using which the relevant object has to be found.
     * @param {boolean} inAction - Defines the active state of the action.
     * @param {PointModel} position - Defines the position.
     * @param {IElement} source - Defines the source.
     */
    findTargetObjectUnderMouse(objects: (NodeModel | ConnectorModel)[], action: Actions, inAction: boolean, position: PointModel, source?: IElement): IElement;
    /**
     * Finds the child element of the given object at the given position
     *
     * @returns { void } Finds the child element of the given object at the given position .\
     * @param {IElement} obj - Defines the object, the child element of which has to be found
     * @param {PointModel} position - Defines the position, the child element under which has to be found
     * @param {number} padding - Defines the padding, the child element under which has to be found
     */
    findElementUnderMouse(obj: IElement, position: PointModel, padding?: number): DiagramElement;
    /**
     * Defines the action to be done, when the mouse hovers the given element of the given object
     *
     * @returns { void } Defines the action to be done, when the mouse hovers the given element of the given object .\
     * @param {NodeModel | ConnectorModel} obj - Defines the object under mouse
     * @param {DiagramElement} wrapper - Defines the target element of the object under mouse
     * @param {PointModel} position - Defines the current mouse position
     * @param { NodeModel | PointPortModel | ShapeAnnotationModel | PathAnnotationModel} target - Defines the target
     * @private
     */
    findActionToBeDone(obj: NodeModel | ConnectorModel, wrapper: DiagramElement, position: PointModel, target?: NodeModel | PointPortModel | ShapeAnnotationModel | PathAnnotationModel): Actions;
    /**
     * Returns the tool that handles the given action
     *
     * @returns { ToolBase } Returns the tool that handles the given action \
     * @param {string} action - Defines the action that is going to be performed
     */
    getTool(action: string): ToolBase;
    /**
     * Defines the cursor that corresponds to the given action
     *
     * @returns { string } Defines the cursor that corresponds to the given action \
     * @param {string} action - Defines the action that is going to be performed
     * @param {boolean} active - Defines the active
     */
    getCursor(action: string, active: boolean): string;
    /**
     * Initializes the undo redo actions
     *
     * @returns { void } Initializes the undo redo actions \
     * @private
     */
    initHistory(): void;
    /**
     * Adds the given change in the diagram control to the track
     *
     * @returns { void } Adds the given change in the diagram control to the track \
     * @param {HistoryEntry} entry - Defines the entry/information about a change in diagram
     * @param {string[]} sourceId - Defines the source id
     */
    addHistoryEntry(entry: HistoryEntry, sourceId?: string[]): void;
    private checkCurrentSymbol;
    /**
     * Adds the given custom change in the diagram control to the track
     *
     * @returns { void } Adds the given custom change in the diagram control to the track \
     * @param {HistoryEntry} entry - Defines the entry/information about a change in diagram
     */
    addCustomHistoryEntry(entry: HistoryEntry): void;
    /** @private */
    historyChangeTrigger(entry: HistoryEntry, action: HistoryChangeAction, sourceId?: string[]): void;
    /**
     * Starts grouping the actions that will be undone/restored as a whole
     *
     * @returns { void } Starts grouping the actions that will be undone/restored as a whole\
     */
    startGroupAction(): void;
    /**
     * Closes grouping the actions that will be undone/restored as a whole
     *
     * @returns { void } Closes grouping the actions that will be undone/restored as a whole .\
     */
    endGroupAction(): void;
    /**
     * Restores the last action that is performed
     *
     * @returns { void } Restores the last action that is performed .\
     */
    undo(): void;
    /**
     * Restores the last undone action
     *
     * @returns { void } Restores the last undone action .\
     */
    redo(): void;
    private getBlazorDiagramObjects;
    /**
     * Aligns the group of objects to with reference to the first object in the group
     *
     * @returns { void } Aligns the group of objects to with reference to the first object in the group .\
     * @param {AlignmentOptions}option - Defines the factor, by which the objects have to be aligned
     * @param {NodeModel[] | ConnectorModel[]} objects - Defines the objects that have to be aligned
     * @param {AlignmentMode} type - Defines the type to be aligned
     */
    align(option: AlignmentOptions, objects?: (NodeModel | ConnectorModel)[], type?: AlignmentMode): void;
    /**
     * Arranges the group of objects with equal intervals, but within the group of objects
     *
     * @returns { void } Arranges the group of objects with equal intervals, but within the group of objects .\
     * @param {NodeModel[] | ConnectorModel[]} option - Defines the factor to distribute the shapes
     * @param {DistributeOptions} objects - Defines the objects that have to be equally spaced
     */
    distribute(option: DistributeOptions, objects?: (NodeModel | ConnectorModel)[]): void;
    /**
     * Scales the given objects to the size of the first object in the group
     *
     * @returns { void } Scales the given objects to the size of the first object in the group .\
     * @param {SizingOptions} option - Defines whether the node has to be horizontally scaled, vertically scaled or both
     * @param {NodeModel[] | ConnectorModel[]}objects - Defines the collection of objects that have to be scaled
     */
    sameSize(option: SizingOptions, objects?: (NodeModel | ConnectorModel)[]): void;
    private updateBlazorDiagramProperties;
    private getZoomingAttribute;
    /**
     * Scales the diagram control by the given factor
     *
     * @returns { void } Scales the diagram control by the given factor .\
     * @param {number} factor - Defines the factor by which the diagram is zoomed
     * @param {PointModel} focusedPoint - Defines the point with respect to which the diagram has to be zoomed
     */
    zoom(factor: number, focusedPoint?: PointModel): void;
    /**
     * Scales the diagram control by the given factor
     *
     * @returns { void }  Scales the diagram control by the given factor .\
     * @param {ZoomOptions} options - used to define the zoom factor, focus point and zoom type.
     *
     */
    zoomTo(options: ZoomOptions): void;
    /**
     * Pans the diagram control to the given horizontal and vertical offsets
     *
     * @returns { void } Pans the diagram control to the given horizontal and vertical offsets .\
     * @param {number} horizontalOffset - Defines the horizontal distance to which the diagram has to be scrolled
     * @param {number} verticalOffset - Defines the vertical distance to which the diagram has to be scrolled
     * @param {PointModel} focusedPoint - Provide the focusedPoint value
     * @param {boolean} isInteractiveZoomPan - Provide the isInteractiveZoomPan value
     */
    pan(horizontalOffset: number, verticalOffset: number, focusedPoint?: PointModel, isInteractiveZoomPan?: boolean): void;
    /**
     * Resets the zoom and scroller offsets to default values
     *
     * @returns { void } Resets the zoom and scroller offsets to default values .\
     */
    reset(): void;
    /**
     * Resets the segments of the connectors
     *
     * @returns { void } Resets the segments of the connectors .\
     */
    resetSegments(): void;
    /**
     * setBlazorDiagramProps method
     *
     * @returns {void} setBlazorDiagramProps method .\
     * @param {boolean} arg - provide the eventName value.
     * @private
     */
    setBlazorDiagramProps(arg: boolean): void;
    /**
     * getDirection method
     *
     * @returns { Promise<void | object> } getDirection method .\
     * @param {DiagramEvent} eventName - provide the eventName value.
     * @param {Object} args - provide the args value.
     * @private
     */
    triggerEvent(eventName: DiagramEvent, args: Object): Promise<void | object>;
    private updateEventValue;
    /**
     * Adds the given node to the lane
     *
     * @returns { void }     Adds the given node to the lane .\
     * @param {NodeModel} node - provide the node value.
     * @param {string} swimLane - provide the swimLane value.
     * @param {string} lane - provide the lane value.

     */
    addNodeToLane(node: NodeModel, swimLane: string, lane: string): void;
    /**
     * Shows tooltip for corresponding diagram object
     *
     * @param {NodeModel | ConnectorModel} obj - Defines the object for that tooltip has to be shown
     */
    showTooltip(obj: NodeModel | ConnectorModel): void;
    /**
     * hides tooltip for corresponding diagram object
     *
     * @param {NodeModel | ConnectorModel} obj - Defines the object for that tooltip has to be hide
     */
    hideTooltip(obj: NodeModel | ConnectorModel): void;
    /**
     * Adds the given node to diagram control
     *
     * @returns { Node }     getDirection method .\
     * @param {NodeModel} obj - Defines the node that has to be added to diagram
     * @param {boolean} group - Defines the node that has to be added to diagram
     * @blazorArgsType obj|DiagramNode
     */
    addNode(obj: NodeModel, group?: boolean): Node;
    /**
     * Adds the given diagram object to the group.
     *
     * @returns { void }     Adds the given diagram object to the group.\
     * @param {NodeModel} group - defines where the diagram object to be added.
     * @param {string | NodeModel | ConnectorModel} child - defines the diagram object to be added to the group
     * @blazorArgsType obj|DiagramNode
     */
    addChildToGroup(group: NodeModel, child: string | NodeModel | ConnectorModel): void;
    /**
     * Will return the history stack values
     *
     * @returns { void } Will return the history stack values .\
     * @param {boolean} isUndoStack - returns the history stack values
     */
    getHistoryStack(isUndoStack: boolean): HistoryEntry[];
    /**
     * Return the edges for the given node
     *
     * @returns { string[] } Return the edges for the given node .\

     * @param {Object} args - return the edge of the given node
     */
    getEdges(args: Object): string[];
    /**
     * Returns the parent id for the node
     *
     * @returns { string }Returns the parent id for the node .\

     * @param {string} id - returns the parent id
     */
    getParentId(id: string): string;
    /**
     * Adds the given connector to diagram control
     * @returns { Connector } Adds the given connector to diagram control .\
     *
     * @param {ConnectorModel} obj - Defines the connector that has to be added to diagram
     * @blazorArgsType obj|DiagramConnector
     */
    addConnector(obj: ConnectorModel): Connector;
    /** @private */
    UpdateBlazorDiagramModelCollection(obj: Node | Connector, copiedObject?: (NodeModel | ConnectorModel)[], multiSelectDelete?: (NodeModel | ConnectorModel)[], isBlazorGroupUpdate?: boolean): void;
    /**
     *  UpdateBlazorDiagramModel method
     *
     * @returns { void }  UpdateBlazorDiagramModel method .\
     * @param {Node | Connector | ShapeAnnotation | PathAnnotation} obj - provide the obj value.
     * @param {string} objectType - provide the objectType value.
     * @param {number} removalIndex - provide the removalIndex value.
     * @param {number} annotationNodeIndex - provide the annotationNodeIndex value.
     *
     * @private
     */
    UpdateBlazorDiagramModel(obj: Node | Connector | ShapeAnnotation | PathAnnotation, objectType: string, removalIndex?: number, annotationNodeIndex?: number): void;
    private UpdateBlazorLabelOrPortObjects;
    /**
     *  addBlazorDiagramObjects method
     *
     * @returns { void }  addBlazorDiagramObjects method .\
     *
     * @private
     */
    addBlazorDiagramObjects(): void;
    private removeNodeEdges;
    /**
     *  insertBlazorConnector method
     *
     * @returns { void }  insertBlazorConnector method .\
     * @param {Connector} obj - provide the nodeId value.
     *
     * @private
     */
    insertBlazorConnector(obj: Connector): void;
    /**
     * Adds the given object to diagram control
     *
     * @returns { Node | Connector }     getDirection method .\
     * @param {NodeModel | ConnectorModel} obj - Defines the object that has to be added to diagram
     * @param {boolean} group - provide the group value.
     */
    add(obj: NodeModel | ConnectorModel, group?: boolean): Node | Connector;
    private updateSvgNodes;
    /**
     *  updateProcesses method
     *
     * @returns { void }  updateProcesses method .\
     * @param {(Node | Connector)} node - provide the nodeId value.
     *
     * @private
     */
    updateProcesses(node: (Node | Connector)): void;
    /**
     *  moveSvgNode method
     *
     * @returns { void }  moveSvgNode method .\
     * @param {string} nodeId - provide the nodeId value.
     *
     * @private
     */
    moveSvgNode(nodeId: string): void;
    /**
     * Adds the given annotation to the given node
     *
     * @returns { void } Adds the given annotation to the given node .\
     * @param {BpmnAnnotationModel} annotation - Defines the annotation to be added
     * @param {NodeModel} node - Defines the node to which the annotation has to be added
     */
    addTextAnnotation(annotation: BpmnAnnotationModel, node: NodeModel): void;
    private spliceConnectorEdges;
    /**
     * Remove the dependent connectors if the node is deleted
     * @returns { void } Remove the dependent connectors if the node is deleted .\
     * @param {Node} node - provide the node value.
     *
     * @private
     */
    removeDependentConnector(node: Node): void;
    /**
     * Remove the dependent connectors if the node is deleted
     * @returns { void } Remove the dependent connectors if the node is deleted .\
     * @param {(NodeModel | ConnectorModel)} obj - provide the node value.
     *
     * @private
     */
    removeObjectsFromLayer(obj: (NodeModel | ConnectorModel)): void;
    /**
     * removeElements method \
     *
     * @returns { string }     removeElements method .\
     * @param {NodeModel | ConnectorModel} currentObj - provide the currentObj value.
     *
     * @private
     */
    removeElements(currentObj: NodeModel | ConnectorModel): void;
    private removeCommand;
    /**
     * Removes the given object from diagram
     *
     * @param {NodeModel | ConnectorModel} obj - Defines the object that has to be removed from diagram
     */
    remove(obj?: NodeModel | ConnectorModel): void;
    private isStackChild;
    /** @private */
    deleteChild(node: NodeModel | ConnectorModel | string, parentNode?: NodeModel): void;
    /**
     * addChild method \
     *
     * @returns { string }     addChild method .\
     * @param {NodeModel} node - provide the node value.
     * @param {string | NodeModel | ConnectorModel} child - provide the child value.
     * @param {number} index - provide the layoutOrientation value.
     *
     * @private
     */
    addChild(node: NodeModel, child: string | NodeModel | ConnectorModel, index?: number): string;
    /**
     * Clears all nodes and objects in the diagram
     *
     * @returns { void }     getDirection method .\

     */
    clear(): void;
    private clearObjects;
    private startEditCommad;
    /**
     * Specified annotation to edit mode
     *
     * @returns { void }  Specified annotation to edit mode .\
     * @param {NodeModel | ConnectorModel} node - Defines node/connector that contains the annotation to be edited
     * @param {string} id - Defines annotation id to be edited in the node
     */
    startTextEdit(node?: NodeModel | ConnectorModel, id?: string): void;
    private updateConnectorfixedUserHandles;
    private updateNodeExpand;
    private updateConnectorAnnotation;
    private removeChildrenFromLayout;
    /**
     * Automatically updates the diagram objects based on the type of the layout
     * @returns { ILayout | boolean }  Automatically updates the diagram objects based on the type of the layout .\
     */
    doLayout(): ILayout | boolean;
    /**
     * Serializes the diagram control as a string
     * @returns { string }     Serializes the diagram control as a string .\
     */
    saveDiagram(): string;
    /**
     * Converts the given string as a Diagram Control
     *
     * @returns { Object }      Converts the given string as a Diagram Control .\
     * @param {string} data - Defines the behavior of the diagram to be loaded

     */
    loadDiagram(data: string, isEJ1Data?: boolean): Object;
    /**
     * To  get the html diagram content
     *
     * @returns { string }     getDirection method .\
     * @param {StyleSheetList} styleSheets - defines the collection of style files to be considered while exporting.
     */
    getDiagramContent(styleSheets?: StyleSheetList): string;
    /**
     * To export diagram native/html image
     *
     * @returns { void } To export diagram native/html image .\
     * @param {string} image - defines image content to be exported.
     * @param {IExportOptions} options - defines the image properties.
     */
    exportImage(image: string, options: IExportOptions): void;
    /**
     * To print native/html nodes of diagram
     *
     * @returns { void } To print native/html nodes of diagram .\
     * @param {string} image - defines image content.
     * @param {IExportOptions} options - defines the properties of the image
     */
    printImage(image: string, options: IExportOptions): void;
    /**
     * To limit the history entry of the diagram
     *
     * @returns { void }  To limit the history entry of the diagram.\
     * @param {number} stackLimit - defines stackLimit of the history manager.
     */
    setStackLimit(stackLimit: number): void;
    /**
     * To clear history of the diagram
     * @returns { void } To clear history of the diagram .\
     */
    clearHistory(): void;
    /**
     * To get the bound of the diagram
     * @returns { void } To get the bound of the diagram .\
     */
    getDiagramBounds(): Rect;
    /**
     * To export Diagram
     *
     * @returns { void } To export Diagram .\
     * @param {IExportOptions} options - defines the how the image to be exported.
     */
    exportDiagram(options: IExportOptions): string | SVGElement;
    /**
     * To print Diagram
     *
     * @returns { void }     To print Diagram .\
     * @param {IPrintOptions} optons - defines how the image to be printed.
     */
    print(options: IPrintOptions): void;
    /**
     * Add ports at the run time \
     *
     * @returns { void }    Remove Labels at the run time .\
     * @param { Node | ConnectorModel} obj - provide the obj value.
     * @param {ShapeAnnotationModel[] | PathAnnotationModel[]} ports - provide the ports value.
     * @blazorArgsType obj|DiagramNode
     */
    addPorts(obj: NodeModel, ports: PointPortModel[]): void;
    /**
     * Add constraints at run time \
     *
     * @returns { void }Add constraints at run time .\
     * @param {number} constraintsType - provide the source value.
     * @param {number} constraintsValue - provide the target value.
     *
     */
    addConstraints(constraintsType: number, constraintsValue: number): number;
    /**
     * Remove constraints at run time \
     *
     * @returns { void }Remove constraints at run time .\
     * @param {number} constraintsType - provide the source value.
     * @param {number} constraintsValue - provide the target value.
     *
     */
    removeConstraints(constraintsType: number, constraintsValue: number): number;
    /**
     * Add labels in node at the run time in the blazor platform \
     *
     * @returns { void } Add labels in node at the run time in the blazor platform .\
     * @param {NodeModel} obj - provide the obj value.
     * @param {ShapeAnnotationModel[]} labels - provide the labels value.
     *
     */
    addNodeLabels(obj: NodeModel, labels: ShapeAnnotationModel[]): void;
    /**
     * Add labels in connector at the run time in the blazor platform\
     *
     * @returns { void } Add labels in connector at the run time in the blazor platform .\
     * @param {ConnectorModel} obj - provide the obj value.
     * @param {PathAnnotationModel[]} labels - provide the labels value.
     *
     */
    addConnectorLabels(obj: ConnectorModel, labels: PathAnnotationModel[]): void;
    /**
     * Add Labels at the run time \
     *
     * @returns { void } Add Labels at the run time .\
     * @param {NodeModel | ConnectorModel} obj - provide the obj value.
     * @param {ShapeAnnotationModel[] | PathAnnotation[] | PathAnnotationModel[]} labels - provide the labels value.
     *
     */
    addLabels(obj: NodeModel | ConnectorModel, labels: ShapeAnnotationModel[] | PathAnnotation[] | PathAnnotationModel[]): void;
    /**
     * Add dynamic Lanes to swimLane at runtime \
     *
     * @returns { void } Add dynamic Lanes to swimLane at runtime .\
     * @param {NodeModel} node - provide the obj value.
     * @param {LaneModel[]} lane - provide the labels value.
     * @param {number} index - provide the labels value.
     *
     */
    addLanes(node: NodeModel, lane: LaneModel[], index?: number): void;
    /**
     * Add a phase to a swimLane at runtime \
     *
     * @returns { void } Add a phase to a swimLane at runtime .\
     * @param {NodeModel} node - provide the obj value.
     * @param {PhaseModel[]} phases - provide the labels value.
     *
     */
    addPhases(node: NodeModel, phases: PhaseModel[]): void;
    /**
     *Remove dynamic Lanes to swimLane at runtime \
     *
     * @returns { void } Remove dynamic Lanes to swimLane at runtime .\
     * @param {NodeModel} node - provide the node value.
     * @param {LaneModel} lane - provide the lane value.
     *
     */
    removeLane(node: NodeModel, lane: LaneModel): void;
    /**
     *Remove a phase to a swimLane at runtime \
     *
     * @returns { void } Remove a phase to a swimLane at runtime .\
     * @param {NodeModel} node - provide the node value.
     * @param {PhaseModel} phase - provide the phase value.
     *
     */
    removePhase(node: NodeModel, phase: PhaseModel): void;
    private removelabelExtension;
    /**
     * Remove Labels at the run time \
     *
     * @returns { string }    Remove Labels at the run time .\
     * @param { Node | ConnectorModel} obj - provide the obj value.
     * @param {ShapeAnnotationModel[] | PathAnnotationModel[]} labels - provide the labels value.
     *
     */
    removeLabels(obj: Node | ConnectorModel, labels: ShapeAnnotationModel[] | PathAnnotationModel[]): void;
    private removePortsExtenion;
    /**
     * Remove Ports at the run time \
     *
     * @returns { void } checkSourcePointInTarget method .\
     * @param {Node} obj - provide the Connector value.
     * @param {PointPortModel[]} ports - provide the Connector value.
     *
     */
    removePorts(obj: Node, ports: PointPortModel[]): void;
    /**
     * getSizeValue method \
     *
     * @returns { string }     getSizeValue method .\
     * @param {string | number} real - provide the real value.
     * @param {string | number} rulerSize - provide the rulerSize value.
     *
     * @private
     */
    getSizeValue(real: string | number, rulerSize?: number): string;
    private renderRulers;
    private intOffPageBackground;
    private initDiagram;
    private renderHiddenUserHandleTemplateLayer;
    private renderBackgroundLayer;
    private renderGridLayer;
    private renderDiagramLayer;
    private initLayers;
    private renderAdornerLayer;
    private renderPortsExpandLayer;
    private renderHTMLLayer;
    private renderNativeLayer;
    /**
     * createSvg method \
     *
     * @returns { void }     createSvg method .\
     * @param {string} id - provide the source value.
     * @param {string | number} width - provide the source value.
     * @param {string | number} height - provide the source value.
     *
     * @private
     */
    createSvg(id: string, width: string | number, height: string | number): SVGElement;
    private updateBazorShape;
    private initObjects;
    /**
     * initLayerObjects method \
     *
     * @returns { void }     initLayerObjects method .\
     *
     * @private
     */
    initLayerObjects(): void;
    private alignGroup;
    private addToLayer;
    private updateLayer;
    private updateScrollSettings;
    private initData;
    private generateData;
    private makeData;
    private initNodes;
    private initConnectors;
    private setZIndex;
    private initializeDiagramLayers;
    /**
     * resetTool method \
     *
     * @returns { void }     resetTool method .\
     *
     * @private
     */
    resetTool(): void;
    private initObjectExtend;
    /**
     * initObject method \
     *
     * @returns { void }     initObject method .\
     * @param {End} obj - provide the obj value.
     * @param {End} layer - provide the layer value.
     * @param {LayoutOrientation} independentObj - provide the independentObj value.
     * @param {boolean} group - provide the independentObj value.
     *
     * @private
     */
    initObject(obj: IElement, layer?: LayerModel, independentObj?: boolean, group?: boolean): void;
    private getConnectedPort;
    private scaleObject;
    private updateDefaultLayoutIcons;
    private updateDefaultLayoutIcon;
    /**
     * updateGroupOffset method \
     *
     * @returns { void }     updateGroupOffset method .\
     * @param {NodeModel | ConnectorModel} node - provide the source value.
     * @param {boolean} isUpdateSize - provide the target value.
     *
     * @private
     */
    updateGroupOffset(node: NodeModel | ConnectorModel, isUpdateSize?: boolean): void;
    private initNode;
    /**
     * updateDiagramElementQuad method \
     *
     * @returns { void }     updateDiagramElementQuad method .\
     *
     * @private
     */
    updateDiagramElementQuad(): void;
    private onLoadImageSize;
    private updateChildPosition;
    private canExecute;
    private updateStackProperty;
    private initViews;
    private initCommands;
    private overrideCommands;
    private initCommandManager;
    /**
     * updateNodeEdges method \
     *
     * @returns { void }     updateNodeEdges method .\
     * @param {Node} node - provide the source value.
     *
     * @private
     */
    updateNodeEdges(node: Node): void;
    /**
     * updateIconVisibility method \
     *
     * @returns { void }     updateIconVisibility method .\
     * @param {Node} node - provide the source value.
     * @param {boolean} visibility - provide the source value.
     *
     * @private
     */
    private updateIconVisibility;
    /**
     * updateEdges method \
     *
     * @returns { void }     updateEdges method .\
     * @param {Connector} obj - provide the source value.
     *
     * @private
     */
    updateEdges(obj: Connector): void;
    /**
     * updatePortEdges method \
     *
     * @returns { void }     updatePortEdges method .\
     * @param {NodeModel} node - provide the source value.
     * @param {ConnectorModel} obj - provide the target value.
     * @param {boolean} isInEdges - provide the layoutOrientation value.
     *
     * @private
     */
    updatePortEdges(node: NodeModel, obj: ConnectorModel, isInEdges: boolean): void;
    /**
     * refreshDiagram method \
     *
     * @returns { void }     refreshDiagram method .\
     *
     * @private
     */
    refreshDiagram(): void;
    private updateCanupdateStyle;
    private getZindexPosition;
    /**
     *updateDiagramObject method \
     *
     * @returns { void } updateDiagramObject method .\
     * @param { (NodeModel | ConnectorModel) } obj - provide the obj value.
     * @param { boolean } canIgnoreIndex - provide the canIgnoreIndex value.
     * @param { boolean } isUpdateObject - provide the isUpdateObject value.
     *
     * @private
     */
    updateDiagramObject(obj: (NodeModel | ConnectorModel), canIgnoreIndex?: boolean, isUpdateObject?: boolean): void;
    private applyMarginBezier;
    private getMidPoint;
    /**
     * Apply alignment to bezier annotation
     * @param {ConnectorModel | NodeModel} obj - provide the obj value.
     * @param finalPoint
     */
    private applyAlignment;
    private getBezierPoints;
    /**
     *updateGridContainer method \
     *
     * @returns { void } updateGridContainer method .\
     * @param { GridPanel } grid - provide the objectArray value.
     *
     * @private
     */
    updateGridContainer(grid: GridPanel): void;
    /**
     *getObjectsOfLayer method \
     *
     * @returns { (NodeModel | ConnectorModel)[] } getObjectsOfLayer method .\
     * @param { string[] } objectArray - provide the objectArray value.
     *
     * @private
     */
    getObjectsOfLayer(objectArray: string[]): (NodeModel | ConnectorModel)[];
    /**
     *refreshDiagramLayer method \
     *
     * @returns { void } refreshDiagramLayer method .\
     *
     * @private
     */
    refreshDiagramLayer(): void;
    /**
     *refreshCanvasLayers method \
     *
     * @returns { void } refreshCanvasLayers method .\
     * @param { View } view - provide the view value.
     *
     * @private
     */
    refreshCanvasLayers(view?: View): void;
    private renderBasicElement;
    private refreshElements;
    private renderTimer;
    /**
     *refreshCanvasDiagramLayer method \
     *
     * @returns { void } refreshCanvasDiagramLayer method .\
     * @param { View } view - provide the view value.
     *
     * @private
     */
    refreshCanvasDiagramLayer(view: View): void;
    /**
     *updatePortVisibility method \
     *
     * @returns { void } updatePortVisibility method .\
     * @param { Node } node - provide the node value.
     * @param { PortVisibility } portVisibility - provide the portVisibility value.
     * @param { Boolean } inverse - provide the inverse value.
     *
     * @private
     */
    updatePortVisibility(node: Node, portVisibility: PortVisibility, inverse?: Boolean): void;
    /**
     *refreshSvgDiagramLayer method \
     *
     * @returns { void } refreshSvgDiagramLayer method .\
     * @param { View } view - provide the object value.
     *
     * @private
     */
    refreshSvgDiagramLayer(view: View): void;
    /**
     *removeVirtualObjects method \
     *
     * @returns { void } removeVirtualObjects method .\
     * @param { Object } clearIntervalVal - provide the object value.
     *
     * @private
     */
    removeVirtualObjects(clearIntervalVal: Object): void;
    /**
     *updateTextElementValue method \
     *
     * @returns { void } updateTextElementValue method .\
     * @param {  NodeModel | ConnectorModel } object - provide the object value.
     *
     * @private
     */
    updateTextElementValue(object: NodeModel | ConnectorModel): void;
    /**
     *updateVirtualObjects method \
     *
     * @returns { void } updateVirtualObjects method .\
     * @param { string[] } collection - provide the collection value.
     * @param { boolean } remove - provide the remove value.
     * @param { string[] } tCollection - provide the htmlLayer value.
     *
     * @private
     */
    updateVirtualObjects(collection: string[], remove: boolean, tCollection?: string[]): void;
    /**
     *renderDiagramElements method \
     *
     * @returns { void } renderDiagramElements method .\
     * @param { HTMLCanvasElement | SVGElement} canvas - provide the canvas value.
     * @param { DiagramRenderer } renderer - provide the renderer value.
     * @param { HTMLElement } htmlLayer - provide the htmlLayer value.
     * @param {boolean } transform - provide the transform value.
     * @param {boolean } fromExport - provide the fromExport value.
     * @param { boolean } isOverView - provide the isOverView value.
     *
     * @private
     */
    renderDiagramElements(canvas: HTMLCanvasElement | SVGElement, renderer: DiagramRenderer, htmlLayer: HTMLElement, transform?: boolean, fromExport?: boolean, isOverView?: boolean): void;
    /**
     *updateBridging method \
     *
     * @returns { void } updateBridging method .\
     * @param {string} isLoad - provide the isLoad value.
     *
     * @private
     */
    updateBridging(isLoad?: boolean): void;
    /**
     *setCursor method \
     *
     * @returns { void } setCursor method .\
     * @param {string} cursor - provide the width value.
     *
     * @private
     */
    setCursor(cursor: string): void;
    /**
     *clearCanvas method \
     *
     * @returns { void } clearCanvas method .\
     * @param {View} view - provide the width value.
     *
     * @private
     */
    clearCanvas(view: View): void;
    /**
     *updateScrollOffset method \
     *
     * @returns { void } updateScrollOffset method .\
     *
     * @private
     */
    updateScrollOffset(): void;
    /**
     *setOffset method \
     *
     * @returns { void } setOffset method .\
     * @param {number} offsetX - provide the width value.
     * @param {number} offsetY - provide the height value.
     *
     * @private
     */
    setOffset(offsetX: number, offsetY: number): void;
    /**
     *setSize method \
     *
     * @returns { void } setSize method .\
     * @param {number} width - provide the width value.
     * @param {number} height - provide the height value.
     *
     * @private
     */
    setSize(width: number, height: number): void;
    /**
     *transformLayers method \
     *
     * @returns { void } Defines how to remove the Page breaks .\
     *
     * @private
     */
    transformLayers(): void;
    /**
     *Defines how to remove the Page breaks \
     *
     * @returns { void } Defines how to remove the Page breaks .\
     *
     * @private
     */
    removePageBreaks(): void;
    /**
     * Defines how the page breaks has been rendered \
     *
     * @returns { void } Defines how the page breaks has been rendered .\
     * @param {Rect} bounds - provide the overview value.
     *
     * @private
     */
    renderPageBreaks(bounds?: Rect): void;
    private validatePageSize;
    /**
     * setOverview method \
     *
     * @returns { void }     setOverview method .\
     * @param {View} overview - provide the overview value.
     * @param {string} id - provide the boolean value.
     *
     * @private
     */
    setOverview(overview: View, id?: string): void;
    private renderNodes;
    private updateThumbConstraints;
    /**
     * renderSelector method \
     *
     * @returns { void }     renderSelector method .\
     * @param {boolean} multipleSelection - provide the multipleSelection value.
     * @param {boolean} isSwimLane - provide the boolean value.
     *
     * @private
     */
    renderSelector(multipleSelection: boolean, isSwimLane?: boolean): void;
    private updateSelectionRectangle;
    /**
     * updateSelector method \
     *
     * @returns { void }     updateSelector method .\
     *
     * @private
     */
    updateSelector(): void;
    /**
     * renderSelectorForAnnotation method \
     *
     * @returns { void }     renderSelectorForAnnotation method .\
     * @param {Selector} selectorModel - provide the x value.
     * @param {(SVGElement | HTMLCanvasElement)} selectorElement - provide the y value.
     *
     * @private
     */
    renderSelectorForAnnotation(selectorModel: Selector, selectorElement: (SVGElement | HTMLCanvasElement)): void;
    /**
     * drawSelectionRectangle method \
     *
     * @returns { void }     drawSelectionRectangle method .\
     * @param {number} x - provide the x value.
     * @param {number} y - provide the y value.
     * @param {number} width - provide the width value.
     * @param {number} height - provide the height value.
     *
     * @private
     */
    drawSelectionRectangle(x: number, y: number, width: number, height: number): void;
    /**
     * renderHighlighter method \
     *
     * @returns { void }     renderHighlighter method .\
     * @param {DiagramElement} element - provide the node value.
     *
     * @private
     */
    renderHighlighter(element: DiagramElement): void;
    /**
     * clearHighlighter method \
     *
     * @returns { void }     clearHighlighter method .\
     *
     * @private
     */
    clearHighlighter(): void;
    /**
     * getNodesConnectors method \
     *
     * @returns { (NodeModel | ConnectorModel)[] }     getNodesConnectors method .\
     * @param {(NodeModel | ConnectorModel)[]} selectedItems - provide the node value.
     *
     * @private
     */
    getNodesConnectors(selectedItems: (NodeModel | ConnectorModel)[]): (NodeModel | ConnectorModel)[];
    /**
     * clearSelectorLayer method \
     *
     * @returns { void }     clearSelectorLayer method .\
     *
     * @private
     */
    clearSelectorLayer(): void;
    /**
     * getWrapper method \
     *
     * @returns { void }     getWrapper method .\
     * @param {Container} nodes - provide the node value.
     * @param {string} id - provide the childernCollection value.
     *
     * @private
     */
    getWrapper(nodes: Container, id: string): DiagramElement;
    /**
     * DiagramElement method \
     *
     * @returns { void }     getEndNodeWrapper method .\
     * @param {NodeModel | ConnectorModel} node - provide the node value.
     * @param {ConnectorModel} connector - provide the childernCollection value.
     * @param {boolean} source - provide the childernCollection value.
     *
     * @private
     */
    getEndNodeWrapper(node: NodeModel, connector: ConnectorModel, source: boolean): DiagramElement;
    private containsMargin;
    private focusOutEdit;
    private endEditCommand;
    /**
     * @private
     */
    endEdit(): Promise<void>;
    /**
     * getIndex method \
     *
     * @returns { void }     getIndex method .\
     * @param {NodeModel | ConnectorModel} node - provide the node value.
     * @param {string} id - provide the childernCollection value.
     *
     * @private
     */
    getIndex(node: NodeModel | ConnectorModel, id: string): string;
    private getBlazorTextEditArgs;
    /**
     * canLogChange method \
     *
     * @returns { void }     canLogChange method .\
     *
     * @private
     */
    canLogChange(): boolean;
    private modelChanged;
    private resetDiagramActions;
    /**
     * removeNode method \
     *
     * @returns { void }     removeNode method .\
     * @param {NodeModel} node - provide the node value.
     * @param {NodeModel} childernCollection - provide the childernCollection value.
     *
     * @private
     */
    removeNode(node: NodeModel, childernCollection: string[]): void;
    /**
     * deleteGroup method \
     *
     * @returns { void }     deleteGroup method .\
     * @param {NodeModel} node - provide the source value.
     *
     * @private
     */
    deleteGroup(node: NodeModel): void;
    /** @private */
    /**
     * updateObject method \
     *
     * @returns { void }     updateObject method .\
     * @param {Node | Connector} actualObject - provide the source value.
     * @param {Node | Connector} oldObject - provide the target value.
     * @param {Node | Connector} changedProp - provide the layoutOrientation value.
     *
     * @private
     */
    updateObject(actualObject: Node | Connector, oldObject: Node | Connector, changedProp: Node | Connector): void;
    private nodePropertyChangeExtend;
    private swimLaneNodePropertyChange;
    /** @private */
    insertValue(oldNodeObject: any, isNode: boolean): void;
    /** @private */
    nodePropertyChange(actualObject: Node, oldObject: Node, node: Node, isLayout?: boolean, rotate?: boolean, propertyChange?: boolean): void;
    private updatePorts;
    private updateFlipOffset;
    private updateUMLActivity;
    private updateConnectorProperties;
    /**
     * updateConnectorEdges method \
     *
     * @returns { void }     Updates the connectorPropertyChange of the diagram container .\
     * @param {Node} actualObject - provide the actualObject value.
     *
     * @private
     */
    updateConnectorEdges(actualObject: Node): void;
    private connectorProprtyChangeExtend;
    /**
     * Updates the connectorPropertyChange of the diagram container \
     *
     * @returns { void }     Updates the connectorPropertyChange of the diagram container .\
     * @param {DiagramElement} actualObject - provide the actualObject value.
     * @param {boolean} oldProp - provide the oldProp value.
     * @param {boolean} newProp - provide the newProp value.
     * @param {boolean} disableBridging - provide the disableBridging value.
     * @param {boolean} propertyChange - provide the propertyChange value.
     *
     * @private
     */
    connectorPropertyChange(actualObject: Connector, oldProp: Connector, newProp: Connector, disableBridging?: boolean, propertyChange?: boolean): void;
    /**
     * getDirection methods \
     *
     * @returns { void }  getDirection methods .\
     * @param {NodeModel} node - provide the node value.
     * @param {string} portId - provide the portId value.
     * @param {string} item - provide the item value.
     * @param {number} isInEdges - provide the isInEdges value.
     *
     * @private
     */
    removePortEdges(node: NodeModel, portId: string, item: string, isInEdges: boolean): void;
    private getpropertyChangeArgs;
    private triggerPropertyChange;
    private findInOutConnectPorts;
    private getPoints;
    /**
     * update the  opacity  and visibility for the node  once the layout animation starts \
     *
     * @returns { void }  update the  opacity  and visibility for the node  once the layout animation starts .\
     * @param {Container} element - provide the element value.
     * @param {boolean} visible - provide the visible value.
     * @param {number} opacity - provide the opacity value.
     *
     * @private
     */
    updateNodeProperty(element: Container, visible?: boolean, opacity?: number): void;
    /**
     * checkSelected Item for Connector \
     *
     * @returns { void }  checkSelected Item for Connector .\
     * @param {Connector | Node} actualObject - provide the element value.
     *
     * @private
     */
    checkSelectedItem(actualObject: Connector | Node): boolean;
    /**
     * Updates the visibility of the diagram container \
     *
     * @returns { void }     Updates the visibility of the diagram container .\
     * @param {DiagramElement} element - provide the element value.
     * @param {boolean} visible - provide the target value.
     *
     * @private
     */
    private updateDiagramContainerVisibility;
    /**
     * Updates the visibility of the node/connector \
     *
     * @returns { void }  Updates the visibility of the node/connector .\
     * @param {Container} element - provide the element value.
     * @param {Connector | Node} obj - provide the obj value.
     * @param {boolean} visible - provide the visible value.
     *
     * @private
     */
    updateElementVisibility(element: Container, obj: Connector | Node, visible: boolean): void;
    private updateAnnotations;
    private updatefixedUserHandle;
    /**
     * updateConnectorfixedUserHandle method \
     *
     * @returns { void }  updateConnectorfixedUserHandle method .\
     * @param {ConnectorFixedUserHandleModel} changedObject - provide the changedObject value.
     * @param {ConnectorFixedUserHandleModel} actualfixedUserHandle - provide the actualfixedUserHandle value.
     * @param {Container} nodes - provide the nodes value.
     * @param {Object} actualObject - provide the actualObject value.
     * @param {boolean} canUpdateSize - provide the canUpdateSize value.
     *
     * @private
     */
    updateConnectorfixedUserHandle(changedObject: ConnectorFixedUserHandleModel, actualfixedUserHandle: ConnectorFixedUserHandleModel, nodes: Container, actualObject?: Object, canUpdateSize?: boolean): void;
    /**
     * updateAnnotation method \
     *
     * @returns { void }  updateAnnotation method .\
     * @param {AnnotationModel} changedObject - provide the changedObject value.
     * @param {ShapeAnnotationModel} actualAnnotation - provide the actualAnnotation value.
     * @param {Container} nodes - provide the nodes value.
     * @param {Object} actualObject - provide the actualObject value.
     * @param {boolean} canUpdateSize - provide the canUpdateSize value.
     *
     * @private
     */
    updateAnnotation(changedObject: AnnotationModel, actualAnnotation: ShapeAnnotationModel, nodes: Container, actualObject?: Object, canUpdateSize?: boolean): void;
    private updatefixedUserHandleContent;
    private updateConnectorfixedUserHandleWrapper;
    private updateAnnotationContent;
    private updateAnnotationWrapper;
    /**
     * updateNodefixedUserHandle method \
     *
     * @returns { void }  updateNodefixedUserHandle method .\
     * @param {NodeFixedUserHandleModel} changedObject - provide the changedObject value.
     * @param {NodeFixedUserHandleModel} actualfixedUserHandle - provide the actualfixedUserHandle value.
     * @param {Container} nodes - provide the changedObject value.
     * @param {Object} actualObject - provide the changedObject value.
     *
     * @private
     */
    updateNodefixedUserHandle(changedObject: NodeFixedUserHandleModel, actualfixedUserHandle: NodeFixedUserHandleModel, nodes: Container, actualObject?: Object): void;
    private updatefixedUserHandleWrapper;
    /**
     * updatePort method \
     *
     * @returns { void }  updatePort method .\
     * @param {PointPortModel} changedObject - provide the changedObject value.
     * @param {PointPortModel} actualPort - provide the changedObject value.
     * @param {Container} nodes - provide the changedObject value.
     *
     * @private
     */
    updatePort(changedObject: PointPortModel, actualPort: PointPortModel, nodes: Container): void;
    /**
     * updateIcon method \
     *
     * @returns { void }  updateIcon method .\
     * @param {Node} actualObject - provide the obj value.
     *
     * @private
     */
    updateIcon(actualObject: Node): void;
    private getPortContainer;
    private updateTooltip;
    /**
     * updateQuad method \
     *
     * @returns { void }  updateQuad method .\
     * @param {IElement} obj - provide the obj value.
     *
     * @private
     */
    updateQuad(obj: IElement): void;
    /**
     * removeFromAQuad method \
     *
     * @returns { void }  removeFromAQuad method .\
     * @param {IElement} obj - provide the node value.
     *
     * @private
     */
    removeFromAQuad(obj: IElement): void;
    /**
     * updateGroupSize method \
     *
     * @returns { void }  updateGroupSize method .\
     * @param {NodeModel | ConnectorModel} node - provide the node value.
     *
     * @private
     */
    updateGroupSize(node: NodeModel | ConnectorModel): void;
    private updatePage;
    /**
     * protectPropertyChange method \
     *
     * @returns { void }  protectPropertyChange method .\
     * @param {boolean} enable - provide the enable value.
     *
     * @private
     */
    protectPropertyChange(enable: boolean): void;
    /**
     * getProtectPropertyChangeValue method \
     *
     * @returns { boolean }  getProtectPropertyChangeValue method .\
     *
     * @private
     */
    getProtectPropertyChangeValue(): boolean;
    /**
     * enableServerDataBinding method \
     *
     * @returns { void }  enableServerDataBinding method .\
     * @param {boolean} enable - provide the node value.
     *
     * @private
     */
    enableServerDataBinding(enable: boolean): void;
    /**
     * updateShadow method \
     *
     * @returns { void }  updateShadow method .\
     * @param {ShadowModel} nodeShadow - provide the node value.
     * @param {ShadowModel} changedShadow - provide the Node value.
     *
     * @private
     */
    updateShadow(nodeShadow: ShadowModel, changedShadow: ShadowModel): void;
    /**
     * updateMargin method \
     *
     * @returns { void }  updateMargin method .\
     * @param {Node} node - provide the node value.
     * @param {Node} changes - provide the Node value.
     *
     * @private
     */
    updateMargin(node: Node, changes: Node): void;
    private removePreviewChildren;
    private selectDragedNode;
    private initDroppables;
    private getBlazorDragLeaveEventArgs;
    private getDropEventArgs;
    private removeChildInNodes;
    private getBlazorDragEventArgs;
    private findChild;
    private getChildren;
    private addChildNodes;
    private moveNode;
    /**
     * moves the node or connector forward within given layer \
     *
     * @returns { void }  moves the node or connector forward within given layer .\
     * @param {Node | Connector} node - provide the source value.
     * @param {LayerModel} currentLayer - provide the source value.
     *
     */
    moveObjectsUp(node: NodeModel | ConnectorModel, currentLayer: LayerModel): void;
    /**
     * Inserts newly added element into the database \
     *
     * @returns { void }  Inserts newly added element into the database .\
     * @param {Node | Connector} node - provide the source value.
     *
     */
    insertData(node?: Node | Connector): object;
    /**
     * updates the user defined element properties into the existing database \
     *
     * @returns { void }     Removes the user deleted element from the existing database .\
     * @param {Node | Connector} node - provide the source value.
     *
     */
    updateData(node?: Node | Connector): object;
    /**
     * Removes the user deleted element from the existing database \
     *
     * @returns { void }     Removes the user deleted element from the existing database .\
     * @param {Node | Connector} node - provide the source value.
     *
     */
    removeData(node?: Node | Connector): object;
    private crudOperation;
    private processCrudCollection;
    private parameterMap;
    private getNewUpdateNodes;
    private getDeletedNodes;
    private raiseAjaxPost;
    private getHiddenItems;
}
