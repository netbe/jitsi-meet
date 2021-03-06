// @flow

import { PureComponent } from 'react';

import { getLocalizedDateFormatter } from '../../base/i18n';
import { getAvatarURLByParticipantId } from '../../base/participants';

/**
 * Formatter string to display the message timestamp.
 */
const TIMESTAMP_FORMAT = 'H:mm';

/**
 * The type of the React {@code Component} props of {@code AbstractChatMessage}.
 */
export type Props = {

    /**
     * The URL of the avatar of the participant.
     */
    _avatarURL: string,

    /**
     * The representation of a chat message.
     */
    message: Object,

    /**
     * Whether or not the avatar image of the participant which sent the message
     * should be displayed.
     */
    showAvatar: boolean,

    /**
     * Whether or not the name of the participant which sent the message should
     * be displayed.
     */
    showDisplayName: boolean,

    /**
     * Whether or not the time at which the message was sent should be
     * displayed.
     */
    showTimestamp: boolean,

    /**
     * Invoked to receive translated strings.
     */
    t: Function
};

/**
 * Abstract component to display a chat message.
 */
export default class AbstractChatMessage<P: Props> extends PureComponent<P> {
    /**
     * Returns the timestamp to display for the message.
     *
     * @returns {string}
     */
    _getFormattedTimestamp() {
        return getLocalizedDateFormatter(new Date(this.props.message.timestamp))
            .format(TIMESTAMP_FORMAT);
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @param {Props} ownProps - The own props of the component.
 * @returns {{
 *     _avatarURL: string
 * }}
 */
export function _mapStateToProps(state: Object, ownProps: Props) {
    const { message } = ownProps;

    return {
        _avatarURL: getAvatarURLByParticipantId(state, message.id)
    };
}
