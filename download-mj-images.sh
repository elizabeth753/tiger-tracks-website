#!/bin/bash
# Download all Midjourney images to public/images/
# Run from the tigertracks-site directory: bash download-mj-images.sh

mkdir -p public/images

echo "Downloading 24 Midjourney images..."

# Map: job-id -> filename
declare -A IMAGES=(
  ["2bac32bf-ea33-46c5-9597-fb14d792720f"]="mj-01.jpeg"
  ["5860a76b-2606-4adc-b368-272d7e2ddf71"]="mj-02.jpeg"
  ["d28f3fae-b24e-4108-931f-c4c5a9dec951"]="mj-03.jpeg"
  ["5bc59994-d85e-49e5-9fbc-8f25e0a1431a"]="mj-04.jpeg"
  ["9f0bec07-0f8c-49b7-b4da-472618cae4ec"]="mj-05.jpeg"
  ["b1361b84-8617-44de-aa34-dec7cf08ddf0"]="mj-06.jpeg"
  ["0d67afe1-422d-4a9c-8457-f98c2fdc3d14"]="mj-07.jpeg"
  ["f6636cd7-bda7-439b-a6de-27309b128cec"]="mj-08.jpeg"
  ["673dbcfa-8e9d-4b27-b430-e324dcd9b51e"]="mj-09.jpeg"
  ["485c337e-9d46-4b14-862d-d0e04bce5566"]="mj-10.jpeg"
  ["9b055ea8-3329-4fc7-9a2c-e1af83adb02d"]="mj-11.jpeg"
  ["378a3f34-25d9-4799-a28a-6fac3b18af90"]="mj-12.jpeg"
  ["8a419264-06ff-4e5e-bf0d-a315956305e7"]="mj-13.jpeg"
  ["f8eacdce-eced-46ea-a87b-51337f44b1a1"]="mj-14.jpeg"
  ["83e774fa-7b2a-4b0c-9db0-1adf0f9509bf"]="mj-15.jpeg"
  ["c577cc13-eae4-4c6c-915c-d309ca643edd"]="mj-16.jpeg"
  ["04b9515b-c0dc-4991-b5fd-68713293c827"]="mj-17.jpeg"
  ["7cd223ae-133a-4713-b614-37ebcaa5db5a"]="mj-18.jpeg"
  ["bf09b5ca-d52d-4685-b4e0-b9974df67db0"]="mj-19.jpeg"
  ["e8b94a81-21c0-451c-b37e-90035e938aab"]="mj-20.jpeg"
  ["aa79ad0b-1089-49bd-846e-4be381dc262f"]="mj-21.jpeg"
  ["3789b9ba-c7e1-41c2-b307-667616cccaf4"]="mj-22.jpeg"
  ["5adb6fbd-5b5e-424f-852d-677bdf4137d9"]="mj-23.jpeg"
  ["170e7b24-f9c6-4ecb-a934-d17b9d0fb177"]="mj-24.jpeg"
)

count=0
for job_id in "${!IMAGES[@]}"; do
  filename="${IMAGES[$job_id]}"
  echo "  [$((count+1))/24] Downloading $filename..."
  curl -s -o "public/images/$filename" "https://cdn.midjourney.com/${job_id}/0_0.jpeg"
  count=$((count+1))
done

echo ""
echo "Done! $count images saved to public/images/"
echo ""
echo "Alternatively, if images already downloaded to ~/Downloads via Chrome:"
echo "  mv ~/Downloads/mj-*.jpeg public/images/"
ls -lh public/images/mj-*.jpeg 2>/dev/null | awk '{print $5, $9}'
