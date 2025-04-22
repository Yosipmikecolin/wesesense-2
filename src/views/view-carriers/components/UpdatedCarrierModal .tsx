import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FormDataCarrier,
  FormDataWearer,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
} from "@/views/view-create-carrier/interfaces";
import { initialFormData } from "@/views/view-create-carrier/data/initialFormData";
import DataForm from "@/views/view-create-carrier/components/DataForm";
import CauseForm from "@/views/view-create-carrier/components/CauseForm";
import MonitoringForm from "@/views/view-create-carrier/components/MonitoringForm";
import InclusionZoneForm from "@/views/view-create-carrier/components/InclusionZoneForm";
import ExclusionZoneForm from "@/views/view-create-carrier/components/ExclusionZoneForm";
import Timeline from "@/components/timeline/Timeline";
import { updatedCarrier } from "@/api/request";
import Wearer from "@/views/view-create-carrier/components/Wearer";
import axios from "axios";
import { WearerUpdateData } from "@/interfaces/interfaces.update";

import { useBuddieStore } from "@/store/index";

interface Props {
  carrier?: FormDataWearer;
  // carrier?: FormDataCarrier;
  open: boolean;
  onClose: VoidFunction;
  refetch: VoidFunction;
}

const UpdatedCarrierModal = ({ carrier, open, onClose, refetch }: Props) => {
  const { setToken, token } = useBuddieStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataWearer>(initialFormData);
  const steps = ["Wearer"];
  // const steps = ["Datos", "Causa", "Monitoreo", "Inclusión", "Exclusión"];
  const [completeForm, setCompleteForm] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (carrier) {
      setFormData(carrier);
    }
  }, [carrier]);

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

  const updateData = useCallback(
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
        [step]: data,
      }));
    },
    []
  );

  const isStep5Complete = () => {
    let step5 = formData.wearer;
    step5.email = step5.email || "";
    return Object.values(step5).every((value) =>
      typeof value === "boolean" ? true : value.toString().trim() !== ""
    );
    // return false;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          // <DataForm
          //   formData={formData.personalData}
          //   setFormData={(data) => updateData("personalData", data)}
          //   setCompleteForm={setCompleteForm}
          // />
          <Wearer
            formData={formData.wearer}
            setFormData={(data) => updateData("wearer", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      // case 1:
      //   return (
      //     <CauseForm
      //       formData={formData.cause}
      //       setFormData={(data) => updateData("cause", data)}
      //       setCompleteForm={setCompleteForm}
      //     />
      //   );
      // case 2:
      //   return (
      //     <MonitoringForm
      //       formData={formData.monitoring}
      //       setFormData={(data) => updateData("monitoring", data)}
      //       setCompleteForm={setCompleteForm}
      //     />
      //   );
      // case 3:
      //   return (
      //     <InclusionZoneForm
      //       formData={formData.inclusionArea}
      //       setFormData={(data) => updateData("inclusionArea", data)}
      //       setCompleteForm={setCompleteForm}
      //     />
      //   );
      // case 4:
      //   return (
      //     <ExclusionZoneForm
      //       formData={formData.exclusionArea}
      //       setFormData={(data) => updateData("exclusionArea", data)}
      //       setCompleteForm={setCompleteForm}
      //     />
      //   );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (carrier) {
        const wearer_id = carrier.wearer.id;
        const update_wearer = {
          first_name: formData.wearer.first_name,
          dob: "",
          ethnicity_id: "",
          risk_level_id: "0",
          language_id: "0",
          timezone_id: "74",
          hair_colour_id: "",
          eye_colour_id: "",
          surname: formData.wearer.surname,
          gender_id: "0",
          phone_type: "mobile",
          mobile: "322222222",
          country_id: "185",
          email: formData.wearer.email,
          height: "",
          weight: "",
          group_id: "2108",
          "buddicombobox-1607-inputEl": "",
          device_profile_id: "179",
          device_profile_sb_id: "-1",
          wearer_type_id: "21",
          ref: "111",
          criminal_records_no: "",
          vibrate_tag: "",
          audible_vibrate: "-1",
          rule_priority_id: "100",
          clip_panic_number: "",
          sb_outbound_number: "",
          smartid_outbound_number: "",
          view: "",
          preset_id: "",
          notes: "",
          responsible_officer_id: "2452",
          category: "",
          employer_name: "",
          employer_position: "",
          employer_date_started: "",
          employer_additional: "",
          employer_address_line_1: "",
          employer_address_line_2: "",
          employer_address_city: "",
          employer_address_county: "",
          employer_address_postcode: "",
          employer_telephone: "",
          identifying_marks: "",
          risk_assessment: "",
          medical_conditions: "",
          "buddicombobox-1797-inputEl": "",
          ssid: "",
          ssid_password: "",
          interpretor_required: "0",
          exclude_from_proximity: "0",
          exclude_from_loitering: "0",
          exclude_from_auto_day_report: "0",
          filtertype: "ro_only",
          filterstatus: "ALL",
          startdate: "",
          enddate: "",
          filtersearch: "",
          "datefield-2061-inputEl": "",
          "datefield-2062-inputEl": "",
          type_filter: "0",
          status_filter: "0",
          priority_filter: "0",
          user_filter: "0",
          date_filter: "",
          requires_followup: "0",
          start_tagging_time: "2025-04-13 00:15:00",
          end_tagging_time: "2025-04-15 00:45:00",
          categories: "none",
          rule_template_ids: "none",
        };
        const response_update = await axios.post("/api/buddie", {
          method: "setup.wearer.update",
          token,
          wearer_id,
          update_wearer,
        });
        console.log("UPDATE: ", response_update.data);
        setToken(response_update.data.csrf_token);
        // await updatedCarrier(formData);
        setCurrentStep(0);
        // refetch();
        toast.success("Portador actualizado");
        refetch();
        onClose();
      }
    } catch (error) {
      toast.success("Error al actualizar el portador");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="overflow-auto">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-3xl">Editar portador</DialogTitle>
        </DialogHeader>
        <div style={{ height: currentStep === 2 ? "auto" : "" }}>
          <Card className="w-full max-w-3xl mx-auto p-5">
         {/*    <CardHeader className="relative overflow-hidden">
              <Timeline steps={steps} currentStep={currentStep} />
            </CardHeader> */}
            <CardContent>{renderCurrentStep()}</CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant={"primary"}
                onClick={handlePrevious}
                disabled={currentStep === 0}
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
                disabled={
                  (currentStep < steps.length - 1 && !completeForm) ||
                  (currentStep === steps.length - 1 && !isStep5Complete()) ||
                  loading
                }
              >
                {currentStep === steps.length - 1 ? (
                  loading ? (
                    <div className="flex items-center gap-3">
                      <span>Actualizando</span>
                      <div className="loader-button" />
                    </div>
                  ) : (
                    "Actualizar portador"
                  )
                ) : (
                  "Siguiente"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatedCarrierModal;
