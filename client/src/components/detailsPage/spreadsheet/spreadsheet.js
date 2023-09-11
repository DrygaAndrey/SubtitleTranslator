import './spreadsheet.scss';
import useStore from '../../../store';

function Spreadsheet(){
    const {file} = useStore();
    

    function msToTime(duration) {
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + ":" + minutes + ":" + seconds;
      }

    return (
        <div className='table'>
             <div className='table-row'>
              <div className='table-row-start'>start</div>
              <div className='table-row-end'>end</div>
              <div className='table-row-text'>text original</div>
              <div className='table-row-text'>text translated</div>
            </div>
            {file.map((item) => (
            <div className='table-row' key={item.data.start}>
              <div className='table-row-start'>{msToTime(item.data.start)}</div>
              <div className='table-row-end'>{msToTime(item.data.end)}</div>
              <div className='table-row-text'>{item.data.text}</div>
              <div className='table-row-text'>{item.data.translatedText}</div>
            </div>
          ))}
        </div>
    )
}
export default Spreadsheet;