interface LabelPageProps extends PageProps<"/label/[labelName]"> {}

export default async function LabelPage({ params }: LabelPageProps) {
  const { labelName } = await params;
  return <h1>Label for {labelName}</h1>;
}
