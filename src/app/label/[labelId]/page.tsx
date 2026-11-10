interface LabelPageProps extends PageProps<"/label/[labelId]"> {}

export default async function LabelPage({ params }: LabelPageProps) {
  const { labelId } = await params;

  return <h1>Label for {labelId}</h1>;
}
