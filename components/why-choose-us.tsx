import { Shield, Clock, Users, Award, Building2, Headphones } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Verified Properties",
    description: "Every listing is thoroughly vetted to ensure authenticity and accuracy"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our dedicated team is always ready to assist with your property needs"
  },
  {
    icon: Users,
    title: "Expert Agents",
    description: "Work with experienced local agents who know the Kenyan market"
  },
  {
    icon: Award,
    title: "Trusted Platform",
    description: "Over 1,200 successful transactions and counting"
  },
  {
    icon: Building2,
    title: "Wide Coverage",
    description: "Properties available across all 47 counties in Kenya"
  },
  {
    icon: Headphones,
    title: "Easy Communication",
    description: "Connect directly with property owners and agents instantly"
  }
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Nyumba360?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re transforming how Kenyans buy, sell, and rent properties with cutting-edge technology and exceptional service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
