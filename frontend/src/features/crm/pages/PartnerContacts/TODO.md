# TODO: Implement Stepper in PartnerContactForm.jsx

- [x] Import Stepper component from "@/components/ui/stepper"
- [x] Replace custom stepper div with <Stepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
- [x] Remove maxAllowedStep state and related logic
- [x] Update handleStepClick to allow free navigation: setCurrentStep(stepIndex)
- [x] Position stepper correctly in FormPageLayout (before step content)
- [ ] Test stepper navigation
