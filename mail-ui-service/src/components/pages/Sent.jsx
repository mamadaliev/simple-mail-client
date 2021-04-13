import React, {useState} from 'react';
import MailStore from "../../store/MailStore";
import {observer} from "mobx-react-lite";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import {List} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    paper: {
        borderRadius: 4,
        width: 580,
    },
    paperContainer: {
    },
    messageItem: {
        '&:hover': {
            backgroundColor: '#f5f5f5'
        }
    }
}));

const Sent = observer(() => {

    const classes = useStyles();

    useState(() => {
        MailStore.getSentMessages().then(() => {
            console.log(MailStore.sentMessages)
        })
    });

    let sentMessages =
        <List>
            {MailStore.sentMessages.map(message => (
                <ListItem alignItems="flex-start" key={message.id}>
                    <ListItemAvatar>
                        <Avatar alt={message.from} src="/static/images/avatar/3.jpg"/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={message.subject}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {message.from}
                                </Typography>
                                {' — ' + message.content.substring(0, 50) + '...' }
                            </React.Fragment>
                        }
                    />
                </ListItem>
            ))}
        </List>

    return (
        <div className={"container"}>
            <h2>Sent</h2>
            {sentMessages}
        </div>
    );
});

export default Sent;
