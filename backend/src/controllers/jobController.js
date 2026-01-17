import Job from "../models/Job.js";

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate(
      "companyId",
      "-password"
    );

    return res.status(200).json({
      success: true,
      message: "Offre d'emploi trouvée avec succès",
      jobData: jobs,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "La tâche récupérée a échoué",
    });
  }
};

export default getAllJobs;
