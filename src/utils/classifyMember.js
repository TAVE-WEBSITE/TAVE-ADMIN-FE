export const classifyDepartment = (department) => {
  if (department === "PRINCIPAL") {
    return "회장";
  } else if (department === "TECHNICAL") {
    return "기술처";
  } else if (department === "MANAGEMENT") {
    return "경영처";
  }
};

export const classifyJobType = (jobType) => {
  if (jobType === "") {
    return "-";
  } else if (jobType === "STAFF") {
    return "처원";
  } else if (jobType === "DIRECTOR") {
    return "처장";
  }
};

export const ModalClassifyJobType = (department, jobType) => {
  if (department === "PRINCIPAL") {
    return "회장";
  } else if (department === "TECHNICAL") {
    if (jobType === "STAFF") {
      return "기술처원";
    } else if (jobType === "DIRECTOR") {
      return "기술처장";
    }
  } else if (department === "MANAGEMENT") {
    if (jobType === "STAFF") {
      return "경영처원";
    } else if (jobType === "DIRECTOR") {
      return "경영처장";
    }
  }
};
