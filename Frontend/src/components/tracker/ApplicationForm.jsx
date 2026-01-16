import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const STATUS_OPTIONS = ["Applied", "Interview", "Offer", "Rejected"];

// Animated error message component
const ErrorMessage = ({ message }) => (
  <motion.p
    initial={{ opacity: 0, y: -10, height: 0 }}
    animate={{ opacity: 1, y: 0, height: "auto" }}
    exit={{ opacity: 0, y: -10, height: 0 }}
    transition={{ duration: 0.2 }}
    className="text-sm text-red-500"
  >
    {message}
  </motion.p>
);

// Animated form field wrapper
const FormField = ({ children, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="space-y-2"
  >
    {children}
  </motion.div>
);

const ApplicationForm = ({
  formData,
  onChange,
  onSubmit,
  loading,
  submitLabel = "Save",
  errors = {},
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <FormField index={0}>
        <Label htmlFor="companyName">
          Company Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="companyName"
          name="companyName"
          type="text"
          placeholder="e.g., Google"
          value={formData.companyName}
          onChange={handleChange}
          aria-invalid={!!errors.companyName}
          className="transition-all duration-200"
        />
        <AnimatePresence>
          {errors.companyName && <ErrorMessage message={errors.companyName} />}
        </AnimatePresence>
      </FormField>

      <FormField index={1}>
        <Label htmlFor="role">
          Role <span className="text-red-500">*</span>
        </Label>
        <Input
          id="role"
          name="role"
          type="text"
          placeholder="e.g., Software Engineer"
          value={formData.role}
          onChange={handleChange}
          aria-invalid={!!errors.role}
          className="transition-all duration-200"
        />
        <AnimatePresence>
          {errors.role && <ErrorMessage message={errors.role} />}
        </AnimatePresence>
      </FormField>

      <FormField index={2}>
        <Label htmlFor="status">
          Status <span className="text-red-500">*</span>
        </Label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring md:text-sm"
          aria-invalid={!!errors.status}
        >
          <option value="">Select status</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <AnimatePresence>
          {errors.status && <ErrorMessage message={errors.status} />}
        </AnimatePresence>
      </FormField>

      <FormField index={3}>
        <Label htmlFor="appliedDate">
          Applied Date <span className="text-red-500">*</span>
        </Label>
        <Input
          id="appliedDate"
          name="appliedDate"
          type="date"
          value={formData.appliedDate}
          onChange={handleChange}
          aria-invalid={!!errors.appliedDate}
          className="transition-all duration-200"
        />
        <AnimatePresence>
          {errors.appliedDate && <ErrorMessage message={errors.appliedDate} />}
        </AnimatePresence>
      </FormField>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Button
          type="submit"
          className="w-full mt-4 transition-all duration-200"
          disabled={loading}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </motion.span>
            ) : (
              <motion.span
                key="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {submitLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default ApplicationForm;
