import { Box, Card, CardContent, Divider, Grid, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { IVM } from "../services/vmService";
import { PlayArrow, Pause, Stop, Computer, Memory, Storage, Settings } from "@mui/icons-material";

export interface VMCardProps {
  vm: IVM;
  onAction: (id: number, action: 'start' | 'pause' | 'stop') => void;
  onEdit?: (id: number) => void;
}

export const VMCard = ({ vm, onAction, onEdit }: VMCardProps) => {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return theme.palette.success.main;
      case 'paused': return theme.palette.warning.main;
      case 'stopped': return theme.palette.error.main;
      default: return theme.palette.text.secondary;
    }
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 2, position: 'relative', overflow: 'visible' }}>
      <Box sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: getStatusColor(vm.status),
          boxShadow: `0 0 8px ${getStatusColor(vm.status)}`
      }} />

      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: theme.palette.action.hover }}>
                <Computer color="primary" />
            </Box>
            <Box>
                <Typography variant="h6" fontWeight="bold">{vm.name}</Typography>
                <Typography variant="caption" color="text.secondary">{vm.os} • {vm.ip_address}</Typography>
            </Box>
        </Stack>
        
        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={4}>
                <Stack alignItems="center">
                    <Typography variant="caption" color="text.secondary">CPU</Typography>
                    <Typography variant="body2" fontWeight="bold">{vm.cpu_total} vCPU</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack alignItems="center">
                    <Typography variant="caption" color="text.secondary">RAM</Typography>
                    <Typography variant="body2" fontWeight="bold">{vm.ram_total} GB</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                 <Stack alignItems="center">
                    <Typography variant="caption" color="text.secondary">HDD</Typography>
                    <Typography variant="body2" fontWeight="bold">{vm.hdd_total} GB</Typography>
                </Stack>
            </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1}>
                 <IconButton size="small" onClick={() => onAction(vm.idVM, 'start')} color="success" disabled={vm.status === 'running'}>
                    <PlayArrow />
                 </IconButton>
                 <IconButton size="small" onClick={() => onAction(vm.idVM, 'pause')} color="warning" disabled={vm.status !== 'running'}>
                    <Pause />
                 </IconButton>
                 <IconButton size="small" onClick={() => onAction(vm.idVM, 'stop')} color="error" disabled={vm.status === 'stopped'}>
                    <Stop />
                 </IconButton>
            </Stack>
             {onEdit && (
                <IconButton size="small" onClick={() => onEdit(vm.idVM)}>
                    <Settings />
                 </IconButton>
            )}
        </Stack>
      </CardContent>
    </Card>
  );
};
