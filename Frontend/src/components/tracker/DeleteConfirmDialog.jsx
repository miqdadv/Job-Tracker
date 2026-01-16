import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import { useDeleteApplication } from "@/hooks/useTrackerApi";

const DeleteConfirmDialog = ({ open, setOpen, application }) => {
  const { deleteApplication, loading } = useDeleteApplication();

  const handleDelete = async () => {
    if (!application?._id) return;

    const result = await deleteApplication(application._id);
    if (result.success) {
      setOpen(false);
    }
  };

  const handleOpenChange = (isOpen) => {
    if (!loading) {
      setOpen(isOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent onInteractOutside={() => !loading && setOpen(false)}>
        <DialogHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"
          >
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </motion.div>
          <DialogTitle className="text-center">Delete Application</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete this application? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence>
          {application && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="py-4 px-4 space-y-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              <p className="text-sm">
                <span className="font-medium text-gray-600 dark:text-gray-400">Company:</span>{" "}
                <span className="text-gray-900 dark:text-gray-100">{application.companyName}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-600 dark:text-gray-400">Role:</span>{" "}
                <span className="text-gray-900 dark:text-gray-100">{application.role}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter className="gap-2 sm:gap-0">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="transition-all duration-200"
            >
              Cancel
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
              className="transition-all duration-200"
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
                    Deleting...
                  </motion.span>
                ) : (
                  <motion.span
                    key="delete"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Delete
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
