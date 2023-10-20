import * as index from './index';
index.DocumentEditor.Inject(index.Print, index.SfdtExport, index.WordExport, index.TextExport, index.Selection, index.Search, index.Editor, index.EditorHistory, index.OptionsPane, index.ContextMenu, index.ImageResizer, index.HyperlinkDialog, index.TableDialog, index.BookmarkDialog, index.TableOfContentsDialog, index.PageSetupDialog, index.ParagraphDialog, index.ListDialog, index.StyleDialog, index.StylesDialog, index.BulletsAndNumberingDialog, index.FontDialog, index.TablePropertiesDialog, index.BordersAndShadingDialog, index.TableOptionsDialog, index.CellOptionsDialog, index.SpellChecker, index.SpellCheckDialog, index.CollaborativeEditing, index.ColumnsDialog);
index.DocumentEditorContainer.Inject(index.Toolbar);
export * from './index';
