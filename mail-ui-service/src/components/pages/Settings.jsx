import React from 'react'
import {observer} from "mobx-react-lite"
import {useState} from "react";
import SaveIcon from "@material-ui/icons/Save";
import {Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField} from "@material-ui/core";
import {fade} from "@material-ui/core/styles";
import SettingsStore from "../../store/SettingsStore";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 240,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(0),
        marginTop: 20,
        borderRadius: 20,
        background: '#0099ff',
        '&:hover': {
            backgroundColor: fade('#0099ff', 1),
        },
        '&:active': {
            backgroundColor: fade('#0099ff', 1),
        },
    },
}));

const Settings = observer(() => {

    const classes = useStyles();

    // const [settings, setSettings] = useState({
    //     isGmail: true,
    //     protocol: 'smtp',
    //     port: '578',
    //     email: '',
    //     password: ''
    // });

    useState(() => {
        SettingsStore.settings.isGmail = localStorage.getItem('isGmail') === ''
            ? true
            : localStorage.getItem('isGmail');

        SettingsStore.settings.protocol = localStorage.getItem('protocol') === ''
            ? 'smtp'
            : localStorage.getItem('protocol');

        SettingsStore.settings.port = localStorage.getItem('port') === ''
            ? 578
            : localStorage.getItem('port');

        SettingsStore.settings.email = localStorage.getItem('email') === ''
            ? ''
            : localStorage.getItem('email');

        SettingsStore.settings.password = localStorage.getItem('password') === ''
            ? ''
            : localStorage.getItem('password');
    });

    const onSaveSettings = () => {
        localStorage.setItem('isGmail', SettingsStore.settings.isGmail === '' ? true : SettingsStore.settings.isGmail);
        localStorage.setItem('protocol', SettingsStore.settings.protocol === '' ? 'smtp' : SettingsStore.settings.protocol);
        localStorage.setItem('email', SettingsStore.settings.email === '' ? '' : SettingsStore.settings.email);
        localStorage.setItem('port', SettingsStore.settings.port === '' ? '578' : SettingsStore.settings.port);
        localStorage.setItem('password', SettingsStore.settings.password === '' ? '' : SettingsStore.settings.password);
    };

    return (
        <div className={"container"}>
            <h2>Settings</h2>

            <div className={"email-select-panel"}>
                <ul>
                    <li>
                        <input className={"radio-select"} type="radio" name="gmail" checked={SettingsStore.settings.isGmail.valueOf()}/>
                        <span className={"radio-select-text"}>Gmail</span>
                    </li>
                    <li>
                        <input className={"radio-select"} type="radio" name="other" disabled/>
                        <span className={"radio-select-text"}>Other</span>
                    </li>
                </ul>
            </div>
            <form>
                <FormControl className={classes.formControl}>
                    <InputLabel
                        id="select-protocol">
                        Protocol
                    </InputLabel>
                    <Select
                        labelId="select-protocol"
                        id="select-protocol"
                        value={SettingsStore.settings.protocol}
                        onChange={e => {
                            SettingsStore.settings.isGmail = e.target.value
                        }}>
                        <MenuItem value={"smtp"}>SMTP</MenuItem>
                        <MenuItem value={"pop3"}>POP3</MenuItem>
                        <MenuItem value={"imap"}>IMAP</MenuItem>
                    </Select>
                </FormControl>
                <div className={"settings-input-block"}>
                    <TextField
                        id="standard-basic"
                        className={"settings-input"}
                        name={"port"}
                        label="Port"
                        type="text"
                        placeholder="Port"
                        value={SettingsStore.settings.port}
                        onChange={e => {
                            SettingsStore.settings.port = e.target.value
                        }}/>
                </div>
                <div className={"settings-input-block"}>
                    <TextField
                        id="standard-basic"
                        className={"settings-input"}
                        name={"email"}
                        label="Email"
                        type="text"
                        placeholder="Email"
                        value={SettingsStore.settings.email}
                        onChange={e => {
                            SettingsStore.settings.email = e.target.value
                        }}/>
                </div>
                <div className={"settings-input-block"}>
                    <TextField
                        id="standard-basic"
                        className={"settings-input"}
                        name={"password"}
                        label="Password"
                        type="password"
                        placeholder="Password"
                        value={SettingsStore.settings.password}
                        onChange={e => {
                            SettingsStore.settings.password = e.target.value
                        }}/>
                </div>
                <div className={"save-btn"}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={onSaveSettings}
                        endIcon={<SaveIcon/>}>
                        Save
                    </Button>
                    {/*<button>Save</button> <span className={"saved-status"}>Saved...</span>*/}
                </div>
            </form>
        </div>
    );
});

export default Settings
