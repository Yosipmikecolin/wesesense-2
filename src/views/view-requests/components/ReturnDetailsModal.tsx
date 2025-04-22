import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RequestTable } from "@/views/view-create-request/interfaces";

interface ReturnDetailsProps {
  type: "requester" | "awardee";
  request?: RequestTable;
  open: boolean;
  onClose: VoidFunction;
}

const ReturnDetailsModal = ({
  open,
  onClose,
  request,
  type,
}: ReturnDetailsProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "requester"
              ? request?.reason_revolution_requester[
                  request.reason_revolution_requester.length - 1
                ]?.reason_return
              : request?.reason_revolution_awardee[
                  request.reason_revolution_awardee.length - 1
                ]?.reason_return}
          </DialogTitle>
        </DialogHeader>
        <p>
          {type === "requester"
            ? request?.reason_revolution_requester[
                request.reason_revolution_requester.length - 1
              ]?.description_reason
            : request?.reason_revolution_awardee[
                request.reason_revolution_awardee.length - 1
              ]?.description_reason}
        </p>
        <DialogFooter>
          <Button type="submit" onClick={onClose}>
            Entiendo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnDetailsModal;
