'use client';

import { useCreateNewOrgMutation, useGetProxyUserQuery } from '@/store/apis/orgs';
import { useSwitchOrgMutation } from '@/store/apis/user';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { ArrowRight, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface WorkspaceSelectionModalProps {
  open: boolean;
  handleClose: () => void;
  templateId: string;
  templateName: string;
}

const WorkspaceSelectionModal: React.FC<WorkspaceSelectionModalProps> = ({
  open,
  handleClose,
  templateId,
  templateName,
}) => {
  const router = useRouter();
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { data: proxyUser, isLoading: loadingOrgs } = useGetProxyUserQuery(undefined);
  const [createNewOrg, { isLoading: isCreatingOrg }] = useCreateNewOrgMutation();
  const [switchOrg, { isLoading: isSwitchingOrg }] = useSwitchOrgMutation();

  const organizations = proxyUser?.c_companies || [];
  const currentOrgId = proxyUser?.currentCompany?.id;

  useEffect(() => {
    if (currentOrgId) {
      setSelectedOrgId(String(currentOrgId));
    }
  }, [currentOrgId]);

  useEffect(() => {
    // Reset state when modal opens
    if (open) {
      setError(null);
      setIsCreatingNew(false);
      setNewOrgName('');
    }
  }, [open]);

  const handleOrgSelect = (orgId: string) => {
    setSelectedOrgId(orgId);
    setIsCreatingNew(false);
    setError(null);
  };

  const handleCreateNewClick = () => {
    setIsCreatingNew(true);
    setSelectedOrgId('');
    setError(null);
  };

  const handleContinue = async () => {
    try {
      setError(null);

      // If creating new workspace
      if (isCreatingNew) {
        if (!newOrgName.trim()) {
          setError('Please enter a workspace name');
          return;
        }

        const { data } = await createNewOrg({ name: newOrgName.trim() }).unwrap();
        const newOrgId = data?.id;

        if (newOrgId) {
          // Navigate to the new org's template page on the UI app
          window.location.href = `${process.env.NEXT_PUBLIC_INTERNAL_URL}/org/${newOrgId}/templates?templateId=${templateId}`;
          handleClose();
        } else {
          setError('Failed to create workspace');
        }
      } else {
        // Using existing workspace
        if (!selectedOrgId) {
          setError('Please select a workspace');
          return;
        }

        // Switch org if different from current
        if (String(selectedOrgId) !== String(currentOrgId)) {
          await switchOrg({ id: selectedOrgId }).unwrap();
        }

        // Navigate to templates page on the UI app
        window.location.href = `${process.env.NEXT_PUBLIC_INTERNAL_URL}/org/${selectedOrgId}/templates?templateId=${templateId}`;
        handleClose();
      }
    } catch (err: any) {
      setError(err?.data?.message || err?.message || 'An error occurred');
    }
  };

  const isLoading = isCreatingOrg || isSwitchingOrg;
  const canContinue = isCreatingNew ? newOrgName.trim().length > 0 : selectedOrgId !== '';

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'primary.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Building2 size={24} className="text-blue-600" />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Choose Workspace
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select where to install {templateName}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {loadingOrgs ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Existing Workspaces */}
            {organizations.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Your Workspaces
                </Typography>
                <RadioGroup value={selectedOrgId} onChange={e => handleOrgSelect(e.target.value)}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {organizations.map((org: any) => (
                      <Card
                        key={org.id}
                        variant="outlined"
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          borderColor: selectedOrgId === String(org.id) ? 'primary.main' : 'divider',
                          bgcolor: selectedOrgId === String(org.id) ? 'primary.50' : 'background.paper',
                          '&:hover': {
                            borderColor: 'primary.main',
                            boxShadow: 1,
                          },
                        }}
                        onClick={() => handleOrgSelect(String(org.id))}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: 'primary.main',
                                fontSize: '1rem',
                                fontWeight: 600,
                              }}
                            >
                              {org.name?.charAt(0)?.toUpperCase() || 'W'}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body1" fontWeight={600}>
                                {org.name}
                              </Typography>
                              {String(org.id) === String(currentOrgId) && (
                                <Typography variant="caption" color="primary.main" fontWeight={500}>
                                  Current workspace
                                </Typography>
                              )}
                            </Box>
                            <FormControlLabel value={String(org.id)} control={<Radio />} label="" sx={{ m: 0 }} />
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </RadioGroup>
              </Box>
            )}

            {/* <Divider sx={{ my: 3 }}>
              <Typography variant="caption" color="text.secondary">
                OR
              </Typography>
            </Divider> */}

            {/* Create New Workspace */}
            {/* <Box>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Create New Workspace
              </Typography>
              {!isCreatingNew ? (
                <Card
                  variant="outlined"
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    borderStyle: 'dashed',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.50',
                    },
                  }}
                  onClick={handleCreateNewClick}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: 'primary.50',
                          color: 'primary.main',
                        }}
                      >
                        <Plus size={20} />
                      </Avatar>
                      <Typography variant="body1" fontWeight={600} color="primary.main">
                        Create New Workspace
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  variant="outlined"
                  sx={{
                    borderColor: 'primary.main',
                    bgcolor: 'primary.50',
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <TextField
                      fullWidth
                      label="Workspace Name"
                      value={newOrgName}
                      onChange={e => setNewOrgName(e.target.value)}
                      placeholder="Enter workspace name"
                      autoFocus
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'background.paper',
                        },
                      }}
                    />
                    <Button
                      size="small"
                      onClick={() => {
                        setIsCreatingNew(false);
                        setNewOrgName('');
                      }}
                      sx={{ mt: 1.5 }}
                    >
                      Cancel
                    </Button>
                  </CardContent>
                </Card>
              )}
            </Box> */}

            {/* Error Message */}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} variant="outlined" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleContinue}
          variant="contained"
          disabled={!canContinue || isLoading}
          endIcon={isLoading ? <CircularProgress size={16} /> : <ArrowRight size={18} />}
        >
          {isLoading ? 'Processing...' : 'Continue'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkspaceSelectionModal;
