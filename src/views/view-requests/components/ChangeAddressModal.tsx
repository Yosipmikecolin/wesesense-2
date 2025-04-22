import { updatedRequest } from "@/api/request";
import Timeline from "@/components/timeline/Timeline";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ExclusionZoneForm from "@/views/view-create-carrier/components/ExclusionZoneForm";
import InclusionZoneForm from "@/views/view-create-carrier/components/InclusionZoneForm";
import {
  FormDataCarrier,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
} from "@/views/view-create-carrier/interfaces";
import { RequestTable } from "@/views/view-create-request/interfaces";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  request: RequestTable;
  onClose: VoidFunction;
  refetch: VoidFunction;
}

const steps = ["Inclusión", "Exclusión"];

export const ChangeAddressModal = ({
  isOpen,
  onClose,
  refetch,
  request,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completeForm, setCompleteForm] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<RequestTable>({
    ...request,
    carrier: {
      ...request.carrier,
      inclusionArea: {
        street: "",
        number: "",
        additionalInformation: "",
        commune: "",
        region: "",
        road: "",
        population: "",
        zipCode: "",
        geographicCoordinates: "",
        radio: "",
        complianceSchedule: "",
        characteristics: "",
      },
      exclusionArea: {
        complianceSchedule: "",
        street: "",
        number: "",
        additionalInformation: "",
        commune: "",
        region: "",
        road: "",
        population: "",
        zipCode: "",
        geographicCoordinates: "",
        radio: "",
        characteristics: "",
        paternalSurname: "",
        motherSurname: "",
        names: "",
        rut: "",
        victimEmail: "",
        homeTelephone: "",
        workplaceTelephone: "",
      },
    },
  });

  const updateDataCarrier = useCallback(
    (
      step: keyof FormDataCarrier,
      data:
        | Step1Data
        | Step2Data
        | Step3Data
        | Step4Data
        | Step5Data
        | Step6Data
    ) => {
      setFormData((prevData) => ({
        ...prevData,
        carrier: {
          ...prevData.carrier,
          [step]: data,
        },
      }));
    },
    []
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <InclusionZoneForm
            formData={formData.carrier.inclusionArea}
            setFormData={(data) => updateDataCarrier("inclusionArea", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 1:
        return (
          <ExclusionZoneForm
            formData={formData.carrier.exclusionArea}
            setFormData={(data) => updateDataCarrier("exclusionArea", data)}
            setCompleteForm={setCompleteForm}
          />
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await updatedRequest({
        ...formData,
        status: "reviewing",
      });
      refetch();
      toast.success("Se genero una nueva SIFT");
      onClose();
    } catch (error) {
      toast.error("Error al generar la SIFT");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[800px] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl mb-3">Cambiar domicilió</DialogTitle>
          <Timeline steps={steps} currentStep={currentStep} />
        </DialogHeader>

        <CardContent>{renderCurrentStep()}</CardContent>

        <DialogFooter className="flex items-center justify-between">
          <Button
            variant={"primary"}
            onClick={handlePrevious}
            disabled={currentStep <= 0}
          >
            Atras
          </Button>

          <Button
            variant={"primary"}
            onClick={() => {
              if (currentStep === steps.length - 1) {
                handleSubmit();
              } else {
                handleNext();
              }
            }}
            disabled={isLoading || !completeForm}
          >
            {currentStep === steps.length - 1 ? (
              isLoading ? (
                <div className="flex justify-center items-center gap-3">
                  <div className="loader-button" />
                  <span>Cambiando domicilió</span>
                </div>
              ) : (
                "Crear domicilió"
              )
            ) : (
              "Siguiente"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
