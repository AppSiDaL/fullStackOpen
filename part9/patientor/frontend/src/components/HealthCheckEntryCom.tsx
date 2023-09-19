import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { HealthCheckEntry } from "../types";
import { Diagnoses } from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

interface HealthCheckEntryProps {
  healthCheckProps: HealthCheckEntry;
  diagnoses: Diagnoses[];
}

const HealthCheckEntryCom = ({
  healthCheckProps,
  diagnoses,
}: HealthCheckEntryProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={8}>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text" gutterBottom>
                    {healthCheckProps.date}
                    <LocalHospitalIcon />
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text">
                    {healthCheckProps.description}
                  </Typography>
                  <Typography variant="body2">
                    <FavoriteIcon
                      color={
                        healthCheckProps.healthCheckRating === "Healthy"
                          ? "warning"
                          : "success"
                      }
                    />
                  </Typography>
                  <Typography variant="body2">
                    Diagnose by: {healthCheckProps.specialist}
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {healthCheckProps.diagnosisCodes?.map((diagnose,index) => {
              const diagnoseDescription = diagnoses.find(
                (d) => d.code === diagnose
              );

              return (
                <div key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={diagnose}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {diagnoseDescription?.name}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HealthCheckEntryCom;
