import {
  CardHeader,
  CardContent,
  CardMedia,
  Card,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuCard({ menuItem }) {
  const navigate = useNavigate();

  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          onClick={() => navigate(menuItem.url)}
          title={menuItem.title}
          subheader={menuItem.subheader}
        />
        <CardMedia
          component="img"
          height="300"
          width="100"
          sx={1}
          image={menuItem.image}
        />
        <CardContent>
          <Typography variant="body" color="textSecondary">
            {menuItem.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
