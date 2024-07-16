import React, { useMemo } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Room } from "../../types/Room";

export const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
  const navigate = useNavigate();

  const roomName = useMemo(() => {
    return room.users
      .map((user) => user.username)
      .join(`/`)
  }, [room.users]);

  const onRoomClick = () => {
    navigate(`/rooms/${room._id}`);
  };

  return (
    <Card
      variant={"elevation"}
      onClick={onRoomClick}
      style={{
        cursor: "pointer",
      }}
    >
      <CardContent>
        <Typography style={{
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>{roomName}</Typography>
      </CardContent>
    </Card>
  );
};
