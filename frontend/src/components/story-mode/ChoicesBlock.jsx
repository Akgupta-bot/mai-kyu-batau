import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion'

export default function ChoicesBlock({ scenario, onChoice }) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 text-center">Choose wisely</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {scenario.choices.map((c, idx) => (
          <motion.button
            key={idx}
            onClick={() => onChoice(c.next_scenario)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-14 text-base font-medium rounded-xl border bg-white hover:bg-gray-50 transition-all hover:scale-[1.02] px-4 py-2 text-left"
            title={c.consequence}
          >
            {c.option}
          </motion.button>
        ))}
      </CardContent>
    </>
  );
}