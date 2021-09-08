import { Profile } from 'app/models/profile';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react';
import FollowButton from './FollowButton';

interface Props {
    profile: Profile;
}

export default function ProfileCard({profile}: Props) {
    function truncate(str: string | undefined) {
        if (str) {
            return str.length > 40 ? str.substring(0, 37) + '...' : str;
        }
    }
    return (
        <Card>
            <Image as={Link} to={`/profiles/${profile.username}`} src={profile.image || '/assets/user.png'} />
            <Card.Content as={Link} to={`/profiles/${profile.username}`}>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{truncate(profile.bio)}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
                {profile.followersCount} followers
            </Card.Content>
            <FollowButton profile={profile} />
        </Card>
    )
}