
import { Barcode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function BarcodePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <Card className="w-full max-w-md py-12 px-6 flex flex-col items-center">
        <CardContent className="flex flex-col items-center justify-center gap-6">
          <Barcode size={70} className="text-primary" />
          <div className="text-2xl font-bold">Scan Barcode</div>
          <p className="text-muted-foreground text-center">Point your scanner or camera at the item barcode, or enter it manually below.</p>
          <input
            type="text"
            placeholder="Enter barcode manually"
            className="w-full max-w-xs input border rounded px-3 py-2 focus:outline-none"
          />
          <Button className="w-full text-lg py-5">Simulate Scan</Button>
          <Link to="/pos" className="mt-2 w-full">
            <Button variant="outline" className="w-full">Back to POS</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
