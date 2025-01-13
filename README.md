<h2>This is the devhub org.</h2>
It has the default folder which contains funcionalities already developed.</h3>
<br><br>
<blockquote>
⚠️ You should create a folder called "manifest-history", just a simple copy of manifest, to track your future generated new packages so they will remain between branch switches.
</blockquote>
<h4>➕ For a new development you crate a scratch org and a new branch to hold it:</h4>

```js
sf org create scratch -d -f config/project-scratch-def.json -a new-feature-org
```

<br>
Before you start the development in scratch, create a folder called "new" to track new files in an separate dir.
<br>
When you finish, create the package containing metadata description:

```
sf project generate manifest --source-dir force-app/main/new --name package-feature --output-dir manifest
sf project generate manifest --source-dir force-app/main/new --name package-feature --output-dir manifest-history
```

<h4>☑️ Push changes to git and switch back to devhub. Your package will be safe in manifest-history folder.</h4>
Retrieve:

```
sf project retrieve start -x manifest-history/package-feature.xml --output-dir new --target-org new-feature-org
```

Validate:

```
sf project deploy validate -x manifest-history/package-feature.xml --target-org dev-hub -l RunSpecifiedTests -t TestClass1 -t TestClass2
```

<h4>❕ If the validation succeeds</h4>
Pass job ID to "sf project deploy quick" command to deploy the metadata. 
<br>
It will takes less time because it skips running Apex tests.
<br>

```
sf project deploy quick --job-id 0Af0x000017yLUFCA2
```