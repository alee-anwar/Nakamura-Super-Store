// import icons
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
// Navbar Titles
export const mainNavbarItems = [
    {
        id: 0,
        icon: <DashboardRoundedIcon/>,
        label: 'Dashboard',
        route: 'dashboard',
    },
    {
        id: 1,
        icon: <Inventory2RoundedIcon/>,
        label: 'Products',
        route: 'products',
    },
    {
        id: 2,
        icon: <LocalShippingRoundedIcon/>,
        label: 'Orders',
        route: 'orders',
    },
    {
        id: 3,
        icon: <PeopleAltRoundedIcon/>,
        label: 'Customers',
        route: 'customers',
    },
    {
        id: 4,
        icon: <StarRoundedIcon/>,
        label: 'Reviews',
        route: 'reviews',
    },
    {
        id: 5,
        icon: <PaidRoundedIcon/>,
        label: 'Transactions',
        route: 'transactions',
    }
]