import { Card, CardContent } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PackageCard = ({
  item,
  selected = false,
  onSelect = () => {},
  dragListeners = {},
  dragAttributes = {},
}) => {
  const navigate = useNavigate();

  return (
    <Card className="border shadow-sm bg-white relative">
      <CardContent className="space-y-2 text-sm pt-2">
        <div className="flex justify-start space-x-4 items-start">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(item.id)}
            className="mt-1"
          />

          <div className="flex flex-col w-full">
            <div className="flex justify-between mb-2">
              <img
                src={item.img}
                alt="thumbnail"
                className=" h-24 object-contain rounded"
              />

              <div
                {...dragAttributes}
                {...dragListeners}
                className="cursor-grab hover:text-gray-500"
              >
                <GripVertical size={18} />
              </div>
            </div>

            <div className="flex gap-2 font-medium text-gray-800">
              <div className="truncate max-w-[70%]">{item.company}</div>
              <div className="whitespace-nowrap">{item.amount}</div>
            </div>

            <div className="flex justify-start gap-2">
              <div
                onClick={() => navigate(`/packages/package-detail`)}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                {item.id}
              </div>
              <span>|</span>
              <div className="text-gray-500">{item.salesOrder}</div>
            </div>

            <div className="flex justify-start gap-2 text-gray-500">
              {item.method && (
                <>
                  <div className="font-semibold">{item.method}</div>
                  <span>|</span>
                </>
              )}
              <div>{item.date}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
