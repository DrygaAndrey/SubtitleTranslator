import './header.scss'
import { useState } from 'react';
import axios from 'axios';
import useStore from '../../../store';
const serverUrl = process.env.REACT_APP_API_URL;

function Header() {
    const [originalLanguage, setOriginalLanguage] = useState('en');
    const [languageToBeTranslated, setLanguageToBeTranslated] = useState('uk');
    const { file, setFile, setLoading } = useStore();

    const handleOriginalLanguage = (event) => {
        setOriginalLanguage(event.target.value);
        console.log(originalLanguage);
    };

    const anotherFileButtonHandler = async () => {
        setFile(null);
    };

    const handleLanguageToBeTranslated = (event) => {
        setLanguageToBeTranslated(event.target.value);
        console.log(languageToBeTranslated);
    };

    const buttonTranslateHandler = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${serverUrl}/api/translate`, { file, originalLanguage, languageToBeTranslated });
            const translatedText = response.data;
            setFile(translatedText.translatedFiles);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert('Server request failed', error);
        }
    };

    const buttonDownloadHandler = async () => {
        try {
            const response = await axios.post(`${serverUrl}/api/download`, { file });
            const blob = new Blob([response.data], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'subtitles.srt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            setLoading(false);
            alert('Server request failed', error);
        }
    };


    return (
        <div className="header">
            <p>Translate from</p>
            <select value={originalLanguage} onChange={handleOriginalLanguage}>
                <option value="en">English</option>
                <option value="uk">Ukrainian</option>
                <option value="ru">Russian</option>
                <option value="tr">Turkish</option>
                <option value="es">Spanish</option>
                <option value="pl">Polish</option>
                <option value="it">Italian</option>
                <option value="de">German</option>
                <option value="fr">French</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
                <option value="ar">Arabic</option>
            </select>
            <p>to</p>
            <select value={languageToBeTranslated} onChange={handleLanguageToBeTranslated}>
                <option value="uk">Ukrainian</option>
                <option value="en">English</option>
                <option value="ru">Russian</option>
                <option value="tr">Turkish</option>
                <option value="es">Spanish</option>
                <option value="pl">Polish</option>
                <option value="it">Italian</option>
                <option value="de">German</option>
                <option value="fr">French</option>
                <option value="zh">Chinese</option>
                <option value="ja">Japanese</option>
                <option value="ar">Arabic</option>
            </select>
            <button onClick={anotherFileButtonHandler}>Choose another file</button>
            <button onClick={buttonTranslateHandler}>Translate</button>
            {file[0].data.translatedText ? <button onClick={buttonDownloadHandler}>Download</button> : <></>}
        </div>
    )
}
export default Header;