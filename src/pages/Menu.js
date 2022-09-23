import React from 'react';
import { Container, Grid } from '@material-ui/core';
import MenuCard from '../components/Menu/MenuCard';
import { MenuItems } from '../components/Menu/MenuItems';

export default function Menu() {
  return (
    <Container>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        style={{ marginTop: '30px' }}
      >
        {MenuItems.map((menuItem) =>
          menuItem.section === 'main' ? (
            <Grid item key={menuItem.id} xs={12} lg={4}>
              <MenuCard menuItem={menuItem} />
            </Grid>
          ) : (
            <></>
          )
        )}
      </Grid>
    </Container>
  );
}
