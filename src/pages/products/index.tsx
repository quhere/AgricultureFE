import { Box, Grid } from '@mui/material';
import AllProductsOfAllDistributor from 'components/AllProductsOfAllDistributor';
import AllProductsOfAllSuppliers from 'components/AllProductsOfAllSuppliers';
import ProductsOfDistributorTable from 'components/sections/dashboard/topProducts/ProductsInWarehouseTableRoleDis';
import ProductsOfSellerTable from 'components/sections/dashboard/topProducts/ProductsInWarehouseTableRoleSeller';
import ProductsOfSupplierTable from 'components/sections/dashboard/topProducts/TopProductsTable';
import { UserProfile } from 'data/dashboard/table';
import { useEffect, useState } from 'react';

const ProductsPage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage!.getItem('user')!) as UserProfile;

    setUser(userData);
  }, []);
  if (user?.role === 'distributor') {
    return (
      <Box
        sx={{
          pb: 1,
        }}
      >
        <Grid container spacing={3} mb={3} columns={1}>
          <Grid item xs={1}>
            <ProductsOfDistributorTable />
          </Grid>
          <Grid item xs={1}>
            <AllProductsOfAllSuppliers />
          </Grid>
        </Grid>
      </Box>
    );
  } else if (user?.role === 'seller') {
    return (
      <Box
        sx={{
          pb: 1,
        }}
      >
        <Grid container spacing={3} mb={3} columns={1}>
          <Grid item xs={1}>
            <ProductsOfSellerTable />
            {/* <AllProductsOfAllDistributor /> */}

          </Grid>
          <Grid item xs={1}>
            {/* <ProductsOfSellerTable /> */}
            <AllProductsOfAllDistributor />

          </Grid>
        </Grid>
      </Box>
    );
  }
  {
    return (
      <Box
        sx={{
          pb: 1,
        }}
      >
        <Grid container spacing={3} mb={3} columns={1}>
          <Grid item xs={1}>
            <ProductsOfSupplierTable />
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default ProductsPage;
