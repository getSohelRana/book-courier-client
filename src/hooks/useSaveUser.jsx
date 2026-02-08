import axios from "axios";

const useSaveUser = () => {
  const saveUserToDB = async (userInfo) => {
    const user = {
      ...userInfo,
      role: userInfo.role || "user",
      createdAt: new Date(),
    };

    try {
      const res = await axios.post("http://localhost:5000/users", user);
      return {
        success: true,
        data: res.data,
        alreadyExists: false,
      };
    } catch (error) {
      //  duplicate email case (409)
      if (error.response?.status === 409) {
        return {
          success: true,
          alreadyExists: true,
          message: "User already registered",
        };
      }
      // real error
      return {
        success: false,
        message: "Failed to save user",
      };
    }
  };
  return { saveUserToDB };
};

export default useSaveUser;
