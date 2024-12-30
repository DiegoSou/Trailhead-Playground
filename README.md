<h2>This is the devhub org.</h2>
It has the default folder witch contains funcionalities already developed.</h3>
<blockquote>
⚠️ You should create a folder called "manifest-history", just a simple copy of manifest, to track your future generated new packages so they will remain between branch switches.
</blockquote>
<h3>➕ For a new development you crate a scratch org and a new branch to hold it:</h3>
<code>sf org create scratch -d -f config/project-scratch-def.json -a new-feature-org</code>
<br>
<br>
Before you start the development in scratch, create a folder called "new" to track new files in an separate dir.
<br>
<br>

When you finish, create the package containing metadata description:
<code>
sf project generate manifest --source-dir force-app/main/new --name package-feature --output-dir manifest;
sf project generate manifest --source-dir force-app/main/new --name package-feature --output-dir manifest-history;
</code>

<h3>☑️ Push changes to git and switch back to devhub. Your package will be safe in manifest-history folder.</h3>
Retrieve:
<code>
sf project retrieve start -x manifest-history/package-feature.xml --output-dir new --target-org new-feature-org
</code>
Validate:
<code>
sf project deploy validate -x manifest-history/package-feature.xml --target-org dev-hub -l RunSpecifiedTests -t TestClass1 -t TestClass2
</code>

<h3>❕ If the validation succeeds</h3>
Pass job ID to "sf project deploy quick" command to deploy the metadata. 
<br>
It will takes less time because it skips running Apex tests.
<code>
sf project deploy quick --job-id 0Af0x000017yLUFCA2
</code>