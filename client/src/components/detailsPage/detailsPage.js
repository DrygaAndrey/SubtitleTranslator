import './detailsPage.scss';
import Header from './header/header';
import Spreadsheet from './spreadsheet/spreadsheet';


function DetailsPage() {
    
    return (
        <div className="detailsPage">
            <h1>Details</h1>
            <Header />
            <Spreadsheet />
        </div>
    );
}

export default DetailsPage;
