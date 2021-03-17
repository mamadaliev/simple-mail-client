import React from 'react'
import {observer} from "mobx-react-lite"
import {useState} from "react";
import SaveIcon from "@material-ui/icons/Save";
import {Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField} from "@material-ui/core";
import {fade} from "@material-ui/core/styles";

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

    const [settings, setSettings] = useState({
            id: 0,
            title: '',
            completed: false
        });

    const classes = useStyles();

    return (
        <div className={"container"}>
            <h2>Settings</h2>

            <div className={"email-select-panel"}>
                <ul>
                    <li>
                        <input className={"radio-select"} type="radio" name="gmail" checked/>
                        <span className={"radio-select-text"}>Gmail</span>
                    </li>
                    <li>
                        <input className={"radio-select"} type="radio" name="other" disabled/>
                        <span className={"radio-select-text"}>Other</span>
                    </li>
                </ul>
            </div>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-protocol">Protocol</InputLabel>
                    <Select
                        labelId="select-protocol"
                        id="select-protocol"
                        value={"smtp"}
                        // onChange={handleChange}
                    >
                        <MenuItem value={"smtp"}>SMTP</MenuItem>
                        <MenuItem value={"pop3"}>POP3</MenuItem>
                        <MenuItem value={"imap"}>IMAP</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <form>
                <div className={"settings-input-block"}>
                    <TextField id="standard-basic" className={"settings-input"} label="Email" type="text" placeholder="Email"/>
                </div>
                <div className={"settings-input-block"}>
                    <TextField id="standard-basic" className={"settings-input"} label="Password" type="password" placeholder="Password"/>
                </div>
                <div className={"save-btn"}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        endIcon={<SaveIcon/>}>
                        Save
                    </Button>
                    <span className={"saved-status"}>Saved...</span>
                    {/*<button>Save</button> <span className={"saved-status"}>Saved...</span>*/}
                </div>
            </form>
        </div>
    );
});

export default Settings
