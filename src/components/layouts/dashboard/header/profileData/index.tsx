import {Avatar, Stack, Typography} from "@mui/material";
import {useUser} from "../../../../../hooks";
import React from "react";

export default function ProfileData() {
    const {user} = useUser();
    return (
        <Stack alignItems="center" spacing={2} sx={{p: 3}}>
            <Avatar
                sx={{width: "80px", height: "80px"}}
                alt="User Image"
                src={user.avatar || ''}
            />
            <Typography sx={{fontSize: 15, fontWeight: 600}} textAlign="center">
                {user.username}
            </Typography>
        </Stack>
    );
}