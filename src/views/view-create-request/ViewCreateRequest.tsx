"use client";

import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RequestPost } from "./interfaces";

import classes from "./ViewCreateRequest.module.css";
import Timeline from "@/components/timeline/Timeline";
import ApplicantForm from "./components/ApplicantForm";
import {
  FormDataCarrier,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
} from "../view-create-carrier/interfaces";
import { initialFormData } from "../view-create-carrier/data/initialFormData";
import toast from "react-hot-toast";
import { addRequest } from "@/api/request";
import { getCountryCode, getDate } from "@/functions";
import CauseForm from "../view-create-carrier/components/CauseForm";
import InclusionZoneForm from "../view-create-carrier/components/InclusionZoneForm";
import ExclusionZoneForm from "../view-create-carrier/components/ExclusionZoneForm";
import DataForm from "../view-create-carrier/components/DataForm";

function generarNumeroAleatorio() {
  return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
}

const ViewCreateRequest = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = [
    "Requirente",
    "Persona sujeta a control, condenado o víctima",
    "Causa",
    // "Monitoreo",
    "Inclusión",
    "Exclusión",
  ];
  const [completeForm, setCompleteForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(true);
  const [formDataCarrier, setFormDataCarrier] =
    useState<FormDataCarrier>(initialFormData);
  const [formData, setFormData] = useState<RequestPost>({
    answer: "---",
    law: "",
    folio: generarNumeroAleatorio(),
    reason_return: "",
    description_reason: "",
    issue_date: getDate(),
    response_date: "",
    return_date: "",
    time_respond: "",
    status: "reviewing",
    requester: {
      fullName: "Jose Stiven Alfredo Mendoza",
      lastName: "Alfredo",
      middleName: "Mendoza",
      email: "jose1293@gmail.com",
      run: "4234234",
      phone: "58367294",
      userType: "Abogado",
      institution: "Los Andes",
      identificationNumber: "Reclusión parcial",
      region: "Santiago de Chile",
      address: "Cra 21 # 43-43",
      accessAreas: "Casa",
      identityVerification: "5937234",
      securityQuestion: "¿Como se llama tu madre?",
      registrationDate: "16/04/2025",
      observations: "Ninguna",
    },
    carrier: initialFormData,
    reason_revolution_requester: [],
    reason_revolution_awardee: [],
    awardee_response: {
      status: "",
      minimum_coverage: "",
      latitude: "",
      length: "",
      indication_aspects: "",
      value: "",
      photographic_evidence: [],
    },
  });

  function convertDate(date: Date): string {
    const anio = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia} 00:00:00`;
  }

  const create_wearer = {
    group_id: "2108",
    first_name:
      formDataCarrier.personalData.fullName +
      " " +
      formDataCarrier.personalData.paternalSurname +
      " " +
      formDataCarrier.personalData.motherSurname,
    surname: formDataCarrier.personalData.run,
    ref: formDataCarrier.cause.rol,
    email: "",
    // notes: "",
    start_tagging_time: convertDate(
      formDataCarrier.personalData.start_tagging_time
    ),
    end_tagging_time: convertDate(
      formDataCarrier.personalData.end_tagging_time
    ),
    device_profile_id: "179",
    // device_profile_sb_id: "",
    device_profile_name: "1. Live Tracking",
    timezone_id: "368",
    wearer_type_id: formDataCarrier.personalData.type_current,
    address_name: "DOMICILIO",
    line_1:
      formDataCarrier.inclusionArea.street +
      " " +
      formDataCarrier.inclusionArea.number +
      " " +
      formDataCarrier.inclusionArea.additionalInformation,
    line_2: "",
    line_3: formDataCarrier.inclusionArea.commune,
    city: "",
    county: formData.carrier.personalData.nationality,
    postcode: "",
    address_type_id: "",
    telephone: formDataCarrier.personalData.phone,
    interpretor_required: "0",
    // size_id: "",
    responsible_officer_id: "",
    country_id: "185",
    // risk_level_id: "",
    lat: "4.650221",
    lon: "-74.070586",
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

  /*   const updateData = useCallback(
    (step: keyof FormDataRequest, data: Requester | FormDataCarrierPost) => {
      setFormData((prevData) => ({
        ...prevData,
        [step]: data,
      }));
    },
    []
  ); */

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
      setFormDataCarrier((prevData) => ({
        ...prevData,
        [step]: data,
      }));
    },
    []
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ApplicantForm
            setCompleteForm={setComplete}
            setFormData={setFormData}
          />
        );

      case 1:
        return (
          <DataForm
            formData={formDataCarrier.personalData}
            setFormData={(data) => updateDataCarrier("personalData", data)}
            setCompleteForm={setComplete}
          />
        );
      case 2:
        return (
          <CauseForm
            formData={formDataCarrier.cause}
            setFormData={(data) => updateDataCarrier("cause", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      // case 3:
      //   return (
      //     <MonitoringForm
      //       formData={formDataCarrier.monitoring}
      //       setFormData={(data) => updateDataCarrier("monitoring", data)}
      //       setCompleteForm={setCompleteForm}
      //     />
      //   );
      case 3:
        return (
          <InclusionZoneForm
            formData={formDataCarrier.inclusionArea}
            setFormData={(data) => updateDataCarrier("inclusionArea", data)}
            setCompleteForm={setCompleteForm}
          />
        );
      case 4:
        return (
          <ExclusionZoneForm
            formData={formDataCarrier.exclusionArea}
            setFormData={(data) => updateDataCarrier("exclusionArea", data)}
            setCompleteForm={setCompleteForm}
          />
        );

      default:
        return null;
    }
  };

  /*   const handleSubmit = async () => {
    setLoading(true);
    try {
      await addRequest({ ...formData, carrier: formDataCarrier });
      const response_create = await axios.post("/api/buddie", {
        method: "setup.wearer.create",
        token,
        create_wearer: create_wearer,
      });
      setFormDataCarrier(initialFormData);
      setToken(response_create.data.csrf_token);
      toast.success("Solicitud creada exitosamente");
      setLoading(false);
      setCurrentStep(0);
      setFormData({
        answer: "",
        description_reason: "",
        reason_return: "",
        issue_date: "",
        response_date: "",
        return_date: "",
        time_respond: "",
        status: "",
        requester: {
          fullName: "Jose Stiven Alfredo Mendoza",
          lastName: "Alfredo",
          middleName: "Mendoza",
          email: "jose1293@gmail.com",
          run: "4234234",
          phone: "58367294",
          userType: "Abogado",
          institution: "Los Andes",
          identificationNumber: "Reclusión parcial",
          region: "Santiago de Chile",
          address: "Cra 21 # 43-43",
          accessAreas: "Casa",
          identityVerification: "5937234",
          securityQuestion: "¿Como se llama tu madre?",
          registrationDate: "16/04/2025",
          observations: "Ninguna",
        },
        carrier: initialFormData,
        awardee_response: {
          status: "",
          minimum_coverage: "",
          latitude: "",
          length: "",
          indication_aspects: "",
          value: "",
          photographic_evidence: [],
        },
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }; */

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addRequest({ ...formData, carrier: formDataCarrier });
      toast.success("Solicitud creada exitosamente");
      setLoading(false);
      setCurrentStep(0);
      setFormDataCarrier(initialFormData);
      localStorage.setItem("carrier-buddie", JSON.stringify(create_wearer));
      setFormData({
        answer: "---",
        law: "",
        folio: 0,
        reason_return: "",
        description_reason: "",
        issue_date: getDate(),
        response_date: "",
        return_date: "",
        time_respond: "",
        status: "reviewing",
        requester: {
          fullName: "Jose Stiven Alfredo Mendoza",
          lastName: "Alfredo",
          middleName: "Mendoza",
          email: "jose1293@gmail.com",
          run: "4234234",
          phone: "58367294",
          userType: "Abogado",
          institution: "Los Andes",
          identificationNumber: "Reclusión parcial",
          region: "Santiago de Chile",
          address: "Cra 21 # 43-43",
          accessAreas: "Casa",
          identityVerification: "5937234",
          securityQuestion: "¿Como se llama tu madre?",
          registrationDate: "16/04/2025",
          observations: "Ninguna",
        },
        carrier: initialFormData,
        reason_revolution_requester: [],
        reason_revolution_awardee: [],
        awardee_response: {
          status: "",
          minimum_coverage: "",
          latitude: "",
          length: "",
          indication_aspects: "",
          value: "",
          photographic_evidence: [],
        },
      });
    } catch (error) {
      toast.error("Error al crear la solicitud");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={classes.container}
      style={{ height: currentStep === 3 || currentStep === 4 ? "auto" : "" }}
    >
      <Card className="w-full max-w-3xl mx-auto p-5">
        <CardHeader className="relative overflow-hidden">
          <CardTitle className="text-3xl mb-2">
            Crear solicitud de factibilidad técnica
          </CardTitle>

          <Timeline steps={steps} currentStep={currentStep} />
        </CardHeader>

        <CardContent>{renderCurrentStep()}</CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant={"primary"}
            onClick={handlePrevious}
            disabled={currentStep <= 0}
          >
            Atras
          </Button>
          <Button
            disabled={complete}
            variant={"primary"}
            onClick={() => {
              if (currentStep === steps.length - 1) {
                handleSubmit();
              } else {
                handleNext();
              }
            }}
            // disabled={loading || !completeForm}
          >
            {currentStep === steps.length - 1 ? (
              loading ? (
                <div className="flex justify-center items-center gap-3">
                  <div className="loader-button" />
                  <span>Creando solicitud</span>
                </div>
              ) : (
                "Crear solicitud"
              )
            ) : (
              "Siguiente"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewCreateRequest;
