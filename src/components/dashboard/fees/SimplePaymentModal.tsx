import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { DollarSign, Receipt, Loader2 } from "lucide-react";
import { usePayments } from "@/hooks/useFeeCollection";
import { Fee, Payment } from "@/services/feeCollectionService";
import { formatCurrency } from "@/utils/formatCurrency";

interface SimplePaymentModalProps {
  fee: Fee;
  onClose: () => void;
}

export function SimplePaymentModal({ fee, onClose }: SimplePaymentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { recordPayment } = usePayments();

  const form = useForm({
    defaultValues: {
      paymentAmount: "",
      paymentMethod: "",
      paymentDate: new Date().toISOString().split("T")[0],
      reference: "",
      notes: "",
    },
  });

  const { control } = form;

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      const paymentData: Partial<Payment> = {
        feeId: fee.id,
        clientId: fee.clientId,
        amount: parseFloat(data.paymentAmount),
        currency: fee.currency,
        paymentMethod: data.paymentMethod as any,
        reference: data.reference,
        notes: data.notes,
        collectedBy: "current-user", // This should come from auth context
        collectedAt: data.paymentDate,
        processingFee: 0, // Calculate based on payment method if needed
        netAmount: parseFloat(data.paymentAmount),
      };

      const result = await recordPayment(paymentData);

      if (result) {
        toast.success("Payment recorded successfully!");
        onClose();
        form.reset();
      }
    } catch (error) {
      console.error("Error recording payment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Fee Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-left">
            Payment for Fee #{fee.id}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Description:</span>
              <div className="font-medium">
                {fee.description || "No description"}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Due Date:</span>
              <div className="font-medium">
                {new Date(fee.dueDate).toLocaleDateString()}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Total Amount:</span>
              <div className="font-medium">{formatCurrency(fee.amount)}</div>
            </div>
            <div>
              <span className="text-gray-500">Outstanding:</span>
              <div className="font-medium text-red-600">
                {formatCurrency(fee.outstandingBalance)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="paymentAmount"
              className="text-left block text-sm font-medium mb-2"
            >
              Payment Amount *
            </Label>
            <Input
              {...form.register("paymentAmount", { required: true })}
              placeholder="Enter amount"
              type="text"
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum: {formatCurrency(fee.outstandingBalance)}
            </p>
          </div>

          <div>
            <Label
              htmlFor="paymentMethod"
              className="text-left block text-sm font-medium mb-2"
            >
              Payment Method *
            </Label>
            <Controller
              name="paymentMethod"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="pos">POS</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="online">Online Payment</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label
              htmlFor="paymentDate"
              className="text-left block text-sm font-medium mb-2"
            >
              Payment Date *
            </Label>
            <Input
              type="date"
              {...form.register("paymentDate", { required: true })}
            />
          </div>

          <div>
            <Label
              htmlFor="reference"
              className="text-left block text-sm font-medium mb-2"
            >
              Reference/Transaction ID
            </Label>
            <Input {...form.register("reference")} placeholder="TRX123456789" />
          </div>
        </div>

        <div>
          <Label
            htmlFor="notes"
            className="text-left block text-sm font-medium mb-2"
          >
            Notes (Optional)
          </Label>
          <Textarea
            {...form.register("notes")}
            placeholder="Additional notes..."
            rows={3}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <DollarSign className="h-4 w-4 mr-2" />
            )}
            {isSubmitting ? "Recording Payment..." : "Record Payment"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
