import './startPage.scss';
import FileDropZone from './fileDropZone/fileDropZone';


function StartPage() {
    
    return (
        <div className="startPage">
            <h1>Subtitle translator</h1>
            <FileDropZone />
        </div>
    );
}

export default StartPage;
