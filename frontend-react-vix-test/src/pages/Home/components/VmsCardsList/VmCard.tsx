import { Box, Button, Divider, IconButton, Stack, ClickAwayListener } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { useTranslation } from "react-i18next";


import { useEffect, useState } from "react";
import { shadow } from "../../../../utils/shadow";
import { makeEllipsis } from "../../../../utils/makeEllipsis";
import { TextRob20Font1MC } from "../../../../components/Text1MC";
import { PencilIcon } from "../../../../icons/PencilIcon";
import { TagStatus } from "./TagStatus";
import { Btn } from "../../../../components/Buttons/Btn";
import { TextRob12Font2Xs } from "../../../../components/Text2Xs";
import { checkStatus } from "../../../../utils/checkStatus";
import { TextRob16FontL } from "../../../../components/TextL";
import { ModalChangeValueInput } from "../../../../components/Modal/ModalChangeValueInput";
import { useSelfPosition } from "../../../../hooks/useSelfPosition";
import { ModalSlider } from "../../../../components/Modal/ModalSlider";
import { ModalWarningDisk } from "./ModalWarningDisk";
import { useVmResource } from "../../../../hooks/useVmResource";
import { VmCardSkeleton } from "./VmCardSkeleton";
import { useZGlobalVar } from "../../../../stores/useZGlobalVar";
import { ChartBarIcon } from "../../../../icons/ChartIcon";
import { TextRob14Font1Xs } from "../../../../components/Text1Xs";
import { TerminalIcon } from "../../../../icons/TerminalIcon";
import { MonitorIcon } from "../../../../icons/MonitorIcon";
import { IVMTask, taskMock } from "../../../../types/VMTypes";

export interface IVmCardProps {
  vmId: number;
  vmName: string;
  status: string | null;
  cpu: number;
  memory: number;
  disk: number;
  os: string;
  task?: IVMTask;
  owner?: string;
  logo?: string;
}

import { useZUserProfile } from "../../../../stores/useZUserProfile";

export const VmCard = ({
  vmId,
  vmName,
  status,
  cpu,
  memory,
  disk,
  os,
  task,
  owner,
}: IVmCardProps) => {
  const { mode, theme } = useZTheme();
  const { role: currentUserRole } = useZUserProfile();
  const { t } = useTranslation();
  const [vmNameState, setVmNameState] = useState<string | number>(vmName);
  const [cpuState, setCpuState] = useState<number | string>(cpu);
  const [memoryState, setMemoryState] = useState<number | string>(memory);
  const [diskState, setDiskState] = useState<number | string>(disk);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [statusState, setStatusState] = useState(status);
  const [preStatusState, setPreStatusState] = useState<string | null>(status);
  const [openModal, setOpenModal] = useState(false);
  const [openModalSlider, setOpenModalSlider] = useState(false);
  const [openModalWarning, setOpenModalWarning] = useState(false);
  const [preDisk, setPreDisk] = useState<number | string>(0);
  const [taskState, setTaskState] = useState(task);
  const { ref, position } = useSelfPosition(openModalSlider);
  const {
    updateThisVm,
    setUpdateThisVm,
    setCurrentIdVM,
    setCurrentVMOS,
    setCurrentVMName,
  } = useZGlobalVar();

  const {
    updateNameVm,
    updateDiskSizeVm,
    getVMById: getVMByIdResource,
    isLoading,
    getOS,
    updateVMStatus,
  } = useVmResource();

  const getVMById = async () => {
    const vm = await getVMByIdResource(vmId);
    if (!vm) return setUpdateThisVm(null);
    setVmNameState(vm.vmName);
    setCpuState(vm.vCPU);
    setMemoryState(vm.ram);
    setDiskState(vm.disk);
    setStatusState(vm.status);
    setPreStatusState(vm.status);
    setTaskState(taskMock);

    setPreDisk(0);
    setShowConfirmation(false);
    setOpenModalWarning(false);
    setOpenModalSlider(false);
    setOpenModal(false);
    setUpdateThisVm(null);
  };

  const handleCancel = () => {
    if (showConfirmation) {
      setShowConfirmation(false);
      setStatusState(preStatusState);
    }
  };

  const handleConfirm = async () => {
    if (statusState !== preStatusState) {
      try {
        // Chamar API para atualizar status da VM
        await updateVMStatus({
          idVM: vmId,
          status: statusState as "RUNNING" | "STOPPED" | "PAUSED",
        });
        setPreStatusState(statusState);
        await getVMById();
      } catch (error) {
        // Reverter em caso de erro
        setStatusState(preStatusState);
      }
    }
    setShowConfirmation(false);
  };

  const handlePaused = () => {
    setStatusState("PAUSED");
    if (checkStatus(statusState, taskState?.action).isRunning)
      setShowConfirmation(true);
  };

  const handleStart = () => {
    setStatusState("RUNNING");
    if (!checkStatus(statusState, taskState?.action).isRunning)
      setShowConfirmation(true);
  };

  const closeModalWarning = () => {
    setOpenModalWarning(false);
    setPreDisk(0);
  };

  const confirmWarning = async () => {
    await updateDiskSizeVm({ idVM: vmId, disk: +preDisk });
    setDiskState(preDisk);
    setOpenModalWarning(false);
    await getVMById();
  };

  const confirmChangeName = async (val: string) => {
    setVmNameState(val);
    await updateNameVm({ idVM: vmId, vmName: val.toString() });
    await getVMById();
  };

  const hasPandingTaskShutdown =
    taskState?.action === "pending" && taskState?.operation === "shutdown";
  const hasPandingTaskStart =
    taskState?.action === "pending" && taskState?.operation === "start";

  const actionExec =
    Boolean(checkStatus(preStatusState).isRunning && !hasPandingTaskShutdown) ||
    hasPandingTaskStart;
  const actionPause =
    Boolean(!checkStatus(preStatusState).isRunning && !hasPandingTaskStart) ||
    hasPandingTaskShutdown;

  useEffect(() => {
    if (updateThisVm === vmId) {
      getVMById();
    }
  }, [updateThisVm, vmId]);

  const getStatusText = (status: string | null) => {
    switch (status) {
      case "RUNNING":
        return "Ativo";
      case "STOPPED":
        return "Parado";
      case "PAUSED":
        return "Pausado";
      default:
        return status;
    }
  };

  // Tentar evitar o loading skeleton se já tivermos dados (previne "blink" no update)
  if (isLoading && !vmNameState) return <VmCardSkeleton />;
  return (
    <>
      <ClickAwayListener onClickAway={handleCancel}>
      <Stack
        sx={{
          height: "315px",
          minWidth: "200px",
          maxWidth: "200px",
          borderRadius: "16px",
          background: theme[mode].light,
          padding: "24px",
          position: "relative",
          boxShadow: `0px 4px 4px ${shadow(mode)}`,
          overflow: "hidden",
        }}
      >
        {/* VM Name */}
        <Stack
          width={"100%"}
          flexDirection={"row"}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <TextRob20Font1MC
            sx={{
              ...makeEllipsis(),
              color: theme[mode].primary,
              lineHeight: "20px",
            }}
          >
            {vmNameState}
          </TextRob20Font1MC>
          {currentUserRole !== "member" && (
            <IconButton
              onClick={() => setOpenModal(true)}
              sx={{
                backgroundColor: theme[mode].blue,
                padding: "2px",
                width: "20px",
                height: "20px",
                "&:hover": {
                  backgroundColor: theme[mode].blue,
                  opacity: 0.8,
                },
              }}
            >
              <PencilIcon fill={"#FFFFFF"} />
            </IconButton>
          )}
        </Stack>
        {/* Status */}
        <Stack mt={"12px"}>
          <TagStatus
            status={preStatusState}
            action={taskState?.action}
            task={taskState?.task}
          />
        </Stack>
        {/* Actions - Animated Sliding Background */}
        {currentUserRole !== "member" ? (
          <Stack
            sx={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              mt: "16px",
              position: "relative", // Needed for absolute positioning of slider
              isolation: "isolate",
            }}
          >
            {/* Sliding Background Box */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "50%",
                backgroundColor: actionPause
                  ? theme[mode].blueMedium
                  : theme[mode].blue,
                borderRadius: actionPause ? "0px 8px 8px 0px" : "8px 0px 0px 8px",
                left: actionPause ? "50%" : "0%",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth sliding animation
                zIndex: 0,
                opacity: actionExec || actionPause ? 1 : 0, // Hide if waiting/loading state
              }}
            />

            {/* Start Button */}
            <Btn
              disabled={checkStatus(preStatusState, taskState?.action).isWaiting}
              onClick={handleStart}
              className="w-full"
              sx={{
                zIndex: 1, // Above the slider
                borderRadius: "8px 0px 0px 8px",
                padding: "0px",
                backgroundColor: "transparent", // Transparent to show slider
                border:
                  checkStatus(preStatusState, taskState?.action).isStopped ||
                  checkStatus(preStatusState, taskState?.action).isPaused
                    ? "1px solid"
                    : "0px solid",
                borderColor: actionExec ? "transparent" : theme[mode].tertiary, // No border when active
              }}
            >
              <TextRob12Font2Xs
                sx={{
                  color: actionExec ? theme[mode].btnText : theme[mode].tertiary,
                  fontWeight: actionExec ? "500" : "400",
                  letterSpacing: "0.5px",
                  lineHeight: "22px",
                  transition: "color 0.3s", // Smooth text color transition
                }}
              >
                {t("home.start")}
              </TextRob12Font2Xs>
            </Btn>

            {/* Stop/Pause Button */}
            <Btn
              disabled={checkStatus(preStatusState, taskState?.action).isWaiting}
              onClick={handlePaused}
              className="w-full"
              sx={{
                zIndex: 1, // Above the slider
                borderRadius: "0px 8px 8px 0px",
                padding: "0px",
                backgroundColor: "transparent", // Transparent to show slider
                border: checkStatus(preStatusState, taskState?.action).isRunning
                  ? "1px solid"
                  : "0px solid",
                borderColor: actionPause ? "transparent" : theme[mode].tertiary, // No border when active
              }}
            >
              <TextRob12Font2Xs
                sx={{
                  color: actionPause ? theme[mode].btnText : theme[mode].tertiary,
                  letterSpacing: "0.5px",
                  fontWeight: actionPause ? "500" : "400",
                  lineHeight: "22px",
                  transition: "color 0.3s", // Smooth text color transition
                }}
              >
                {t("home.stop")}
              </TextRob12Font2Xs>
            </Btn>
          </Stack>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "2px",
              backgroundColor: theme[mode].blue,
              borderRadius: "2px",
              mt: "24px",
              mb: "8px",
              opacity: 0.6,
            }}
          />
        )}
        {/* Owner */}
        <Stack
          sx={{
            marginTop: "6px",
            marginBottom: "6px",
          }}
        >
          <TextRob12Font2Xs
            sx={{
              color: theme[mode].gray,
              fontSize: "10px",
              fontWeight: "300",
              letterSpacing: "0.8px",
              ...makeEllipsis(),
            }}
          >
            {owner}
          </TextRob12Font2Xs>
        </Stack>
        {/* Infos */}
        <Stack width={"100%"}>
          {/* Cpu */}
          <Stack
            sx={{
              width: "100%",
              padding: "0px 0px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].gray,
              }}
            >
              {t("home.cpu")}
            </TextRob16FontL>
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].primary,
              }}
            >
              {cpuState}
            </TextRob16FontL>
          </Stack>
          <Divider
            sx={{
              borderColor: theme[mode].grayLight,
              my: "4px",
            }}
          />
          {/* Memory */}
          <Stack
            sx={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].gray,
              }}
            >
              {t("home.ram")}
            </TextRob16FontL>
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].primary,
              }}
            >
              {memoryState}GB
            </TextRob16FontL>
          </Stack>
          <Divider
            sx={{
              borderColor: theme[mode].grayLight,
              my: "4px",
            }}
          />
          {/* Disk */}
          <Stack
            ref={ref}
            sx={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].gray,
                textTransform: "uppercase",
              }}
            >
              {t("home.disk")}
            </TextRob16FontL>
            {currentUserRole !== "member" ? (
              <IconButton
                onClick={() => setOpenModalSlider(true)}
                sx={{
                  backgroundColor: theme[mode].grayLight,
                  flexDirection: "row",
                  padding: "0px 4px",
                  borderRadius: "4px",
                  marginRight: "-4px",
                  gap: "6px",
                  "&:hover": {
                    backgroundColor: theme[mode].grayLight,
                    opacity: 0.8,
                  },
                }}
              >
                <PencilIcon fill={theme[mode].primary} />
                <TextRob16FontL
                  sx={{
                    fontWeight: "500",
                    color: theme[mode].primary,
                  }}
                >
                  {diskState}GB
                </TextRob16FontL>
              </IconButton>
            ) : (
              <TextRob16FontL
                sx={{
                  fontWeight: "500",
                  color: theme[mode].primary,
                }}
              >
                {diskState}GB
              </TextRob16FontL>
            )}
          </Stack>
          <Divider
            sx={{
              borderColor: theme[mode].grayLight,
              my: "4px",
            }}
          />
          {/* System */}
          <Stack
            sx={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "2px",
            }}
          >
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].gray,
              }}
            >
              {t("home.so")}
            </TextRob16FontL>
            <TextRob16FontL
              sx={{
                fontWeight: "500",
                color: theme[mode].primary,
                ...makeEllipsis(),
              }}
            >
              {os}
            </TextRob16FontL>
          </Stack>
        </Stack>
        {/* Caixa de confirmação */}
        <Stack
          sx={{
            position: "absolute",
            top: showConfirmation ? "0" : "-100%",
            left: 0,
            right: 0,
            zIndex: 20,
            backgroundColor: theme[mode].mainBackground,
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
            padding: "16px 12px",
            justifyContent: "center",
            alignItems: "center",
            transition: "top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            gap: "12px",
            boxShadow: showConfirmation ? `0px 4px 12px ${shadow(mode)}` : "none",
            opacity: showConfirmation ? 1 : 0,
            pointerEvents: showConfirmation ? "auto" : "none",
            height: "auto",
            minHeight: "100px",
          }}
        >
          <Stack spacing={1} width="100%" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <TextRob16FontL
                sx={{
                  fontWeight: "700",
                  color: theme[mode].primary,
                  textAlign: "center",
                  fontSize: "12px",
                  lineHeight: "14px",
                  ...makeEllipsis(),
                  maxWidth: "120px",
                }}
              >
                {vmNameState}
              </TextRob16FontL>
              <Box
                sx={{
                  backgroundColor:
                    preStatusState === "RUNNING"
                      ? theme[mode].green
                      : preStatusState === "PAUSED"
                      ? theme[mode].blue
                      : theme[mode].lightRed,
                  borderRadius: "4px",
                  padding: "2px 6px",
                }}
              >
                <TextRob16FontL
                  sx={{
                    fontWeight: "500",
                    color: "#FFF",
                    fontSize: "10px",
                    lineHeight: "12px",
                  }}
                >
                  {getStatusText(preStatusState)}
                </TextRob16FontL>
              </Box>
            </Stack>

            <TextRob16FontL
              sx={{
                fontWeight: "400",
                color: theme[mode].gray,
                textAlign: "center",
                fontSize: "11px",
                lineHeight: "14px",
              }}
            >
              {statusState === "RUNNING"
                ? "Deseja iniciar a execução?"
                : "Deseja parar a execução?"}
            </TextRob16FontL>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            width="100%"
            justifyContent="center"
          >
            <Button
              onClick={handleConfirm}
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "6px",
                textTransform: "none",
                backgroundColor:
                  statusState === "RUNNING"
                    ? theme[mode].green
                    : theme[mode].red,
                color: "#FFF",
                boxShadow: "none",
                padding: "2px 8px",
                fontSize: "12px",
                minWidth: "unset",
                "&:hover": {
                  backgroundColor:
                    statusState === "RUNNING"
                      ? theme[mode].green
                      : theme[mode].red,
                  opacity: 0.9,
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                },
              }}
            >
              {statusState === "RUNNING" ? "Executar" : "Parar"}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "6px",
                textTransform: "none",
                borderColor: theme[mode].gray,
                color: theme[mode].gray,
                padding: "2px 8px",
                fontSize: "12px",
                minWidth: "unset",
                borderWidth: "1px",
                "&:hover": {
                  borderColor: theme[mode].primary,
                  color: theme[mode].primary,
                  backgroundColor: "transparent",
                  borderWidth: "1px",
                },
              }}
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
        {/* Button Show charts */}
        <Stack
          sx={{
            marginTop: "auto",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          {/* Chart */}
          <Btn
            disabled={
              !checkStatus(statusState, taskState?.action, taskState?.task)
                .isRunning
            }
            onClick={() => {
              setCurrentVMName(vmNameState as string);
              setCurrentIdVM(vmId as number);
              setCurrentVMOS(os);
            }}
            sx={{
              width: "100%",
              border: "1px solid",
              borderColor: theme[mode].blueDark,
              borderRadius: "8px",
              display: "flex",
              flexDirection: "row",
              ":disabled": {
                opacity: 0.4,
              },
            }}
          >
            <ChartBarIcon fill={theme[mode].blueDark} />
            <TextRob14Font1Xs
              sx={{
                color: theme[mode].blueDark,
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "16px",
                wordWrap: "break-word",
              }}
            >
              {t("graphics.showGraph")}
            </TextRob14Font1Xs>
          </Btn>
          {/* Tertminal */}
          {getOS({ osValue: os }).hasTerminal && (
            <Btn
              disabled={
                checkStatus(statusState, taskState?.action, taskState?.task)
                  .isWaiting
              }
              onClick={() => {}}
              sx={{
                width: "40px",
                height: "27px",
                border: "1px solid",
                borderColor: theme[mode].blueDark,
                borderRadius: "8px",
                display: "flex",
                flexDirection: "row",
                padding: "0px 4px",
                ":disabled": {
                  opacity: 0.4,
                },
              }}
            >
              <TerminalIcon fill={theme[mode].blueDark} />
            </Btn>
          )}
          {/* Monitor */}
          {getOS({ osValue: os }).hasMonitor && (
            <Btn
              disabled={
                checkStatus(statusState, taskState?.action, taskState?.task)
                  .isWaiting
              }
              onClick={() => {}}
              sx={{
                width: "40px",
                height: "27px",
                border: "1px solid",
                borderColor: theme[mode].blueDark,
                borderRadius: "8px",
                display: "flex",
                flexDirection: "row",
                padding: "0px 4px",
                ":disabled": {
                  opacity: 0.4,
                },
              }}
            >
              <MonitorIcon fill={theme[mode].blueDark} />
            </Btn>
          )}
        </Stack>
      </Stack>
      </ClickAwayListener>
      {/* Modais */}
      {openModal && (
        <ModalChangeValueInput
          label={vmNameState}
          open={openModal}
          value={vmNameState}
          changeValue={(val) => confirmChangeName(val?.toString())}
          onClose={() => setOpenModal(false)}
        />
      )}
      {openModalSlider && Boolean(position.x || position.y) && (
        <ModalSlider
          step={32}
          min={0}
          max={1024}
          value={diskState}
          posX={position.x}
          posY={position.y}
          handleChange={(val) => {
            setPreDisk(val);
            setOpenModalWarning(true);
          }}
          closeModal={() => setOpenModalSlider(false)}
        />
      )}
      {openModalWarning && (
        <ModalWarningDisk
          open={openModalWarning}
          onClose={closeModalWarning}
          onCancel={closeModalWarning}
          onConfirm={confirmWarning}
        />
      )}
    </>
  );
};
