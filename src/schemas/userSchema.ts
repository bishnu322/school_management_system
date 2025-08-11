import { email, string, z } from "zod";
import { IGender } from "../types/global.type";

//  Zod Schema using nativeEnum
export const userSchema = z.object({
  first_name: z.string().trim().min(1, { message: "First name is required" }),

  last_name: z.string().trim().min(1, { message: "Last name is required" }),

  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),

  role: z.string(),

  email: z.email({ message: "Invalid email format" }),

  age: z.number().int().positive({ message: "Age must be a positive integer" }),

  phone_number: z
    .number()
    .min(1000000000, { message: "Phone number seems invalid" }),

  date_of_birth: z.string({
    message: "Date of birth must be a valid date",
  }),

  address: z.string().min(1, { message: "Address is required" }),

  gender: z.enum(IGender, { message: "Valid gender is required" }),

  profile_image: z.object({
    path: z.string(),
    public_id: z.string(),
  }),
});

type IUserSchema = z.infer<typeof userSchema>;

export const studentSchema = z.object({
  class_id: z.string(),
  roll_number: z.number(),
});

type IStudentSchema = z.infer<typeof studentSchema>;

export const staffSchema = z.object({
  employee_id: z.string(),
  department: z.string(),
  salary: z.number(),
  qualification: z.string(),
  experienceYear: z.number(),
  date_of_join: z.string(),
  staff_data: z.object(),
});

type IStaffSchema = z.infer<typeof staffSchema>;
// const zodValidate = userSchema.safeParse(req.body);

// zodValidate.success;
