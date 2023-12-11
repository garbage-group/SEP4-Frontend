import { Box, Card, CardContent, Typography } from "@mui/material";
import "../../styles/Analytics_css/DataCard.css";

function DataCard({ title, icon, data, className }) {
  return (
    <Box width={"300px"}>
      <Card className={className}>
        <CardContent>
          <Typography gutterBottom variant="h5" component={"div"}>
            <div className="icons">
              <span> {title}</span>
              <span> {icon}</span>
            </div>
          </Typography>
          <Typography variant="body1" color={"#fff"}>
            {data}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export { DataCard };
