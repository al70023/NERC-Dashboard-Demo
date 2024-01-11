import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
 
export const navData = [
    {
        id: 0,
        icon: <ManageSearchIcon />,
        text: "Asset Inventory",
        link: "/"
    },
    {
        id: 1,
        icon: <ListAltIcon />,
        text: "Change Controls",
        link: "changeControls"
    },
    {
        id: 2,
        icon: <BrowserUpdatedIcon />,
        text: "Software Updates",
        link: "softwareUpdates"
    },
    {
        id: 3,
        icon: <LibraryAddIcon />,
        text: "Update Baseline",
        link: "updateBaseline"
    },
    {
        id: 4,
        icon: <PictureAsPdfIcon />,
        text: "Generate PDF Reports",
        link: "pdfReports"
    }
]

